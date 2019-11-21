<template>
  <div>
    <div class="title">
      <p>
        人脸库的图片需要满足：1.像素：800*600 2.尺寸：70*80 3.格式：bmg,JPG,PNG
        4.大小：50K-500K 5.批量批量添加必须是zip包
      </p>
    </div>

    <div class="clearfix">
      <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture"
        :file-list="fileListzip"
        name="file"
        class="upload-list-inline"
        :before-upload="beforeUploadzip"
        @change="handleChangezip"
      >
        <a-button> <a-icon type="upload" />批量上传</a-button>
      </a-upload>
      <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        :file-list="fileList"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div>
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage">
      </a-modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
      fileListzip: []
    }
  },
  watch: {},
  methods: {
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    // checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject阻止图片上传
    checkImageWH(file, width, height) {
      const self = this
      return new Promise(function(resolve, reject) {
        const filereader = new FileReader()
        filereader.onload = e => {
          const src = e.target.result
          const image = new Image()
          image.onload = function() {
            if (width && this.width > width) {
              self.$message.error('请上传宽为' + width + '以下的图片')
              reject()
            } else if (height && this.height > height) {
              self.$message.error('请上传高为' + height + '以下的图片')
              reject()
            } else {
              resolve()
            }
          }
          image.onerror = reject
          image.src = src
        }
        filereader.readAsDataURL(file)
      })
    },
    beforeUpload(file) {
      // 限制图片 格式、size、分辨率
      const isJPG = file.type === 'image/bmg'
      // const isJPEG  = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/JPG'
      const isPNG = file.type === 'image/png'
      if (!(isJPG || isGIF || isPNG)) {
        this.$message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片~')
        return false
      }
      const isLt500k = file.size / 1024 < 500
      if (!isLt500k) {
        this.$message.error('只能上传大小500K 以内的图片~')
      }

      return (
        (isJPG || isGIF || isPNG) &&
        isLt500k &&
        this.checkImageWH(file, 800, 600)
      )
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.fileList = info.fileList
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUploadzip(file) {
      const isZIP = file.type === 'application/zip'
      if (!isZIP) {
        this.$message.error('只能上传ZIP压缩文件~')
        return false
      }
    },
    handleChangezip(info) {
      if (info.file.status === 'uploading') {
        this.fileListzip = info.fileList
        this.loading = true
        return
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.title {
  text-align: left;
  height: 60px;
  padding-top: 20px;
}
</style>
