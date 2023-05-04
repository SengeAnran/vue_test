// 校验
const mobile = (rule, value, callback) => {
  const reg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('手机号格式不正确'));
  }
};
const number = (rule, value, callback) => {
  // console.log(Number(value));
  // console.log(isNaN(value));
  if (!value && value !== 0) {
    callback(new Error('填写不能为空'));
    // }else if((typeof value === String && value.indexOf(".") !== -1 && value.split('.').length > 2) || !parseFloat(value) || parseFloat(value).toString() !== value){
  } else if (isNaN(value)) {
    callback(new Error('请输入正确格式的数字')); //防止输入多个小数点
  } else {
    callback();
  }
};
const numberzero = (rule, value, callback) => {
  // console.log(Number(value));
  // console.log(isNaN(value));
  if (!value && value !== 0) {
    callback(new Error('填写不能为空'));
    // }else if((typeof value === String && value.indexOf(".") !== -1 && value.split('.').length > 2) || !parseFloat(value) || parseFloat(value).toString() !== value){
  } else if (isNaN(value)) {
    callback(new Error('请输入正确格式的数字')); //防止输入多个小数点
  } else {
    callback();
  }
};
const email = (rule, value, callback) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('邮箱格式不正确'));
  }
};

const age = (rule, value, callback) => {
  const number = Number(value);
  if (number < 1 || number > 150) {
    callback(new Error('年龄不正确'));
  } else {
    callback();
  }
};

const upload = (rule, value, callback) => {
  if (!value || value === '' || value.length === 0) {
    callback(new Error('请上传'));
  } else {
    callback();
  }
};

const emptyRich = '<p><br></p>';
const richText = (rule, value, callback) => {
  if (!value || value === emptyRich) {
    callback(new Error('内容不能为空'));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
      rule: {
        input: { required: true, message: '请输入', trigger: 'blur' },
        inputNumber: [{ type: 'string', required: true, trigger: 'blur', validator: number }],
        inputNumberContainZero: [{ type: 'string', required: true, trigger: 'blur', validator: numberzero }],
        upload: {
          required: true,
          validator: upload,
          trigger: ['blur', 'change'],
        },
        select: { required: true, message: '请选择', trigger: 'change' },
        multiSelect: {
          type: 'array',
          required: true,
          message: '请选择',
          trigger: 'change',
        },
        date: {
          // type: "date",
          required: true,
          message: '请选择日期',
          trigger: 'change',
        },
        datetime: {
          // type: "datetime",
          required: true,
          message: '请选择时间',
          trigger: 'change',
        },
        mobile: { required: true, validator: mobile, trigger: 'blur' },
        email: { required: true, validator: email, trigger: 'blur' },
        age: { required: true, validator: age, trigger: 'blur' },
        richText: {
          required: true,
          validator: richText,
          trigger: 'change',
        },
      },
    };
  },
};
