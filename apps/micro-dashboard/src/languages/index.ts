/**
 * 注意：执行compile命令会重新生成本文件，所以请不要修改本文件
 */
import { translate,VoerkaI18nScope  } from "@voerkai18n/runtime"

import defaultFormatters from "./formatters/zh"  
import idMap from "./idMap"                                             // 语言ID映射文件
import storage  from "./storage"
import defaultMessages from "./zh"  



const messages = {
    'zh' :  defaultMessages,
    'en' : ()=>import("./en"),
	'jp' : ()=>import("./jp"),
	'kor' : ()=>import("./kor")
}

const formatters = {
    'zh' :  defaultFormatters,
    'en' : ()=>import("./formatters/en"),
	'jp' : ()=>import("./formatters/jp"),
	'kor' : ()=>import("./formatters/kor")
}

// 语言配置文件
const scopeSettings = {
    "languages": [
        {
            "name": "zh",
            "title": "中文",
            "default": true,
            "active": true
        },
        {
            "name": "en",
            "title": "英语"
        },
        {
            "name": "jp",
            "title": "日语"
        },
        {
            "name": "kor",
            "title": "韩语"
        }
    ],
    "namespaces": {}
}

// 语言作用域
const scope = new VoerkaI18nScope({    
    id          : "micro-dashboard",                    // 当前作用域的id，自动取当前工程的package.json的name
    debug       : false,                            // 是否在控制台输出调试信息   
    idMap,                                          // 消息id映射列表  
    library     : false,                      // 开发库时设为true
    messages,                                       // 语言包
    formatters,                                     // 扩展自定义格式化器    
    storage,                                        // 语言配置存储器
    ...scopeSettings
}) 
// 翻译函数
const scopedTtranslate = translate.bind(scope) 
export { 
    scope as i18nScope,
    scopedTtranslate as t}