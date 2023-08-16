import global_en from './En/global.json'
import global_ar from './Ar/global.json'
import global_fr from './Fr/global.json'
import i18n from 'i18next';
const cookies = new Map(document.cookie.split(';').map((cookie) => cookie.trim().split('=')));
const currentanguage = cookies.get("language") || "en";
i18n.init({
    interpolation: {escapeValue: false},
    lng: currentanguage,
    resources:{
      en:{
        global: global_en
      },
      fr:{
        global: global_fr
      },
      ar:{
        global: global_ar
      },
    }
  })
export default i18n;