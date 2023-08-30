import React from 'react'
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

//the default outlet if the user not enter any conversation yet
const DefaultOutlet = () => {

  const [ t , i18n ] = useTranslation("global");

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  return (
    <div className={`DefaultOutlet ${currentDisplayMode === 'dark' ? 'dark' : 'light'} ${i18n.language === "ar" ? "ar" : null}`}>
        <div className='Container'>
            <h2>{t('home.msgs.defaultOutlet.heading')}</h2>
            <p>{t('home.msgs.defaultOutlet.par')}</p>
        </div>
    </div>
  )
}

export default DefaultOutlet;