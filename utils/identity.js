import moment from 'moment';

/**
 * 校验身份证号码是否合法
 * @param String  id   合法的身份证编号
 * @param Boolean mask 身份证编号是否包含掩码
 * return Boolean 对于有掩码的身份证号码，只校验掩码格式是否正确，通用是前四位为最后四位为明码
 * 对于不包含掩码的，按国家规定格式校验。为真返回true
 */
export function idCodeValid(code, mask, startNum = 4, endNum = 4) {
  // 修改数据时加了掩码的, 直接返回true
  if (
    mask &&
    code.indexOf('*') === startNum &&
    code.lastIndexOf('*') === code.length - 1 - endNum
  ) {
    return true;
  }

  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  let checkBool = true;

  if (
    !code ||
    !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)
  ) {
    checkBool = false;
  } else if (!city[code.substr(0, 2)]) {
    checkBool = false;
  } else if (
    moment(
      ''
        .concat(code.substring(6, 10), '-')
        .concat(code.substring(10, 12), '-')
        .concat(code.substring(12, 14))
    ) > moment()
  ) {
    checkBool = false;
  } else {
    const codeArr = code.split(''); // 加权因子

    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 校验位

    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;

    for (let i = 0; i < 17; i += 1) {
      ai = +codeArr[i];
      wi = factor[i];
      sum += ai * wi;
    }

    if (parity[sum % 11].toString() !== codeArr[17]) {
      checkBool = false;
    }
  }

  return checkBool;
}

/**
 * 根据身份证号码获取性别
 * @param  String id 合法的身份证编号
 * @return String 合法返回0或1，0为男，1位女，不合法返回-1
 */
export function getSexById(id = '') {
  let sex = '-1';

  if (idCodeValid(id)) {
    if (parseInt(id.substr(16, 1), 10) % 2 === 1) {
      // 男
      sex = '0';
    } else {
      // 女
      sex = '1';
    }
  }

  return sex;
}

/**
 * 根据身份证号码获取年龄
 * @param String id 合法的身份证编号
 * return Number 合法返回对应年龄，不合法返回-1
 */
export function getAgeById(id = '') {
  let age = -1;

  if (idCodeValid(id)) {
    const birth = moment(
      ''
        .concat(id.substring(6, 10), '-')
        .concat(id.substring(10, 12), '-')
        .concat(id.substring(12, 14))
    );
    const birthYear = birth.year();
    const birthMonth = birth.month();
    const birthDate = birth.date();
    const now = moment();
    const nowYear = now.year();
    const nowMonth = now.month();
    const nowDate = now.date();
    age = nowYear - birthYear;

    if (birthMonth > nowMonth || (birthMonth === nowMonth && birthDate > nowDate)) {
      age -= 1;
    }
  }

  return age;
}
