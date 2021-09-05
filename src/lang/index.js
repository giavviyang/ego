// 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)。
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import zh from './zh'
import en from './en'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
    zh: {  //中文
        ...zh,
        ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
    },
    en: {   //英文
       ...en,
        ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})
Element.i18n((key,value)=>i18n.t(key,value))
//导出 i18n
export default i18n;
