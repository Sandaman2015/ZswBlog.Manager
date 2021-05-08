import axios from 'axios'
/**
 * 随机获取美丽文章信息
 * @param {*} data 
 */
export function getRandomText() {
    return axios({
        methods: 'get',
        url: 'https://api.ixiaowai.cn/ylapi/index.php'
    })
}