import {
  upload
} from '@/api/attachment'
import {
  Message
} from 'element-ui' // 引入
/* 富文本编辑图片上传配置*/
const uploadConfig = {
  name: 'files', // 必填参数 文件的参数名
  size: 10000, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon' // 可选 可上传的图片格式
}

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{
    'header': 1
  }, {
    'header': 2
  }],
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }],
  [{
    'script': 'sub'
  }, {
    'script': 'super'
  }],
  [{
    'indent': '-1'
  }, {
    'indent': '+1'
  }],
  [{
    'direction': 'rtl'
  }],
  [{
    'size': ['small', false, 'large', 'huge']
  }],
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }],
  [{
    'color': []
  }, {
    'background': []
  }],
  [{
    'font': []
  }],
  [{
    'align': []
  }],
  ['clean'],
  ['link', 'image', 'video']
]
const handlers = {
  image: function image() {
    var self = this
    var fileInput = this.container.querySelector('input.ql-image[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name)
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept)
      fileInput.classList.add('ql-image')
      // 监听选择文件
      fileInput.addEventListener('change', function() {
        // 创建formData
        var formData = new FormData()
        for (var i = 0; i < fileInput.files.length; i++) {
          formData.append(uploadConfig.name, fileInput.files[i])
        }
        const params = {
          operatorId: -1
        }
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime()
          }
        }
        upload(params, formData, config).then(res => {
          if (res.code === 200) {
            Message({
              message: '上传成功！',
              type: 'success'
            })
            const length = self.quill.getSelection(true).index
            for (var i = 0; i < res.result.count; i++) {
              self.quill.insertEmbed(length, 'image', res.result.result[i].path)
              self.quill.setSelection(length + 1)
            }
            fileInput.value = ''
          }
        })
      })
      this.container.appendChild(fileInput)
    }
    fileInput.click()
  }
}

export default {
  placeholder: '请输入内容',
  theme: 'snow', // 主题
  modules: {
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers: handlers // 事件重写
    }
  }
}
