---
title: JavaScript 大文件切片上传、断点续传(Vue版)
date: 2022-06-18
sidebar: auto
tags:
  - JavaScript
categories:
  - JavaScript
---

```javascript
import SparkMd5 from "spark-md5";
import path from "path";

interface ChunkItem {
  file: Blob;
  fileName: string;
}

interface FileBufferInfo {
  hashName: string;
  suffix: string;
  buffer: ArrayBuffer;
}

interface GetUploadedChunks {
  fileList: string[];
}

interface CallbackApi {
  uploadMerge: (hash: string) => Promise<Record<string, any>>;
  getUploadedChunks: (hashName: string) => Promise<GetUploadedChunks>;
  uploadChunk: (fm: FormData) => Promise<string>;
}

class UploadResponse {
  constructor(public data: any, public code: number, public msg: string) {
    this.data = data;
    this.code = code;
    this.msg = msg;
  }
}

export default class SliceUpload {
  static MAX_SLICE_SIZE = 1024 * 10; // 初始切片尺寸
  static MAX_SLICE_COUNT = 100; // 最大切片数
  public chunks: ChunkItem[] = []; // 切好的每一片
  private sliceIndex = 0; // 当前切片的索引
  private sliceSize: number; // 每一片的尺寸
  private sliceCount = 0; // 总共切多少片
  private uploadProgress = 0; // 上传进度条
  private hashName = ""; //  当前文件对应的hash文件名称
  private suffix: null | string = null; //  当前文件的后缀
  private uploadedChunks: string[] = []; // 已经上传的切片信息
  private api: CallbackApi;

  constructor(file: File, callback: CallbackApi) {
    this.sliceSize = SliceUpload.MAX_SLICE_SIZE;
    this.api = callback;
    this.initSliceUpload(file);
    this.chunks = this.handleSliceFile(file);
  }
  /**
   *
   * @desc 文件切片的基本思路: 首先已经确定每一个切片尺寸是 1M (1024 * 1024 * 1 kb) , 然后根据切片尺寸计算出切片数量; 不过如果切片数量超过最大的切片数量, 那么切片尺寸就要重新根据最大切片数量重新计算
   * @param file
   */
  initSliceParams(file: File) {
    // 1. 根据初始切片尺寸计算出切片数量, 并向上取整
    let _sliceCount = Math.ceil(file.size / this.sliceSize);

    // 2. 如果切片数量超过最大的切片数量, 切片数量就是最大切片数量, 切片尺寸是文件总尺寸根据最大切片数量计算
    if (_sliceCount > SliceUpload.MAX_SLICE_COUNT) {
      _sliceCount = SliceUpload.MAX_SLICE_COUNT;
      this.sliceSize = file.size / _sliceCount;
    }

    this.sliceCount = _sliceCount;
  }

  async initSliceUpload(file: File) {
    this.initSliceParams(file);
    const { hashName, suffix } = await this.fileToArrayBuffer(file);
    const { fileList } = (await this.getUploadedChunks(hashName)) as GetUploadedChunks;
    this.uploadedChunks = fileList;

    this.hashName = hashName;
    this.suffix = suffix;
    await this.handleUploadChunks(this.chunks);
  }

  fileToArrayBuffer(file: File): Promise<FileBufferInfo> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = () => {
        const spark = new SparkMd5.ArrayBuffer();
        const buffer = fileReader.result as ArrayBuffer;
        spark.append(buffer);
        const hashName = spark.end();
        const suffix = path.extname(file.name);
        resolve({
          hashName,
          buffer,
          suffix,
        });
      };
    });
  }

  //  获取已经上传过的切片信息
  async getUploadedChunks(fileHashName: string) {
    try {
      return await this.api.getUploadedChunks(fileHashName);
    } catch (error) {
      console.log(error);
    }
  }

  // 按照切片尺寸和切片数量对file进行切片
  handleSliceFile(file: File) {
    const chunks: ChunkItem[] = [];
    // 设 1024* 1024 * 1 = n
    // 1. [0 , n]               0 - n
    // 1. [n, n + n]            n - 2n
    // 1. [n + n, n + n + n ]   2n - 3n
    // ...
    // file.slice(this.sliceIndex * this.sliceSize, (this.sliceIndex + 1) * this.sliceSize)
    while (this.sliceIndex < this.sliceCount) {
      chunks.push({
        file: file.slice(this.sliceIndex * this.sliceSize, (this.sliceIndex + 1) * this.sliceSize),
        fileName: `${this.hashName}_${this.sliceIndex + 1}${this.suffix}`,
      });

      this.sliceIndex++;
    }

    return chunks;
  }

  uploadSuccess() {
    this.uploadProgress++;
    if (this.uploadProgress < this.sliceCount) return;
    this.uploadProgress = this.sliceCount;
  }

  // 上传切片
  handleUploadChunks(chunkList: ChunkItem[]) {
    return new Promise(async (resolve, reject) => {
      const chunkItemRequest = chunkList.map((chunk, i) => {
        if (this.uploadedChunks.includes(chunk.fileName)) {
          this.uploadSuccess();
          return false;
        }
        const fm = new FormData();
        fm.append("file", chunk.file);
        fm.append("filename", chunk.fileName);

        return new Promise((resolve, reject) => {
          this.api
            .uploadChunk(fm)
            .then((res) => {
              this.uploadSuccess();
              resolve(new UploadResponse(res, 1, "success"));
            })
            .catch((err) => {
              reject(new UploadResponse(err, 0, `${err}第${i + 1}片上传失败`));
            });
        });
      });

      try {
        const result = await Promise.all(chunkItemRequest.filter((v) => typeof v !== "boolean"));

        resolve(new UploadResponse(result, 1, "success"));
      } catch (error) {
        reject(new UploadResponse(error, 0, "error"));
      }
    });
  }

  // 合并切片
  async uploadMerge() {
    try {
      const res = await this.api.uploadMerge(`HASH=${this.hashName}&count=${this.sliceCount}`);

      console.log("servicePath ==> :", res);
    } catch (error) {
      console.log(error);
    }
  }
}
```
