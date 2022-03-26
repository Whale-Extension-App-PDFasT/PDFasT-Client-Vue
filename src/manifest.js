module.exports = {
  name: '__MSG_APP_NAME__',
  version: '4.0.0',
  description: '__MSG_APP_DESCRIPTION__',
  author: 'KANG TAE UK, MOON YONG HO, JEON GA BIN',
  default_locale: 'ko',
  manifest_version: 2,
  icons: { '128': 'icons/128.png' },
  permissions: ['<all_urls>', '*://*/*', 'activeTab', 'tabs'],
  sidebar_action: {
    default_title: '__MSG_APP_NAME__',
    default_page: 'pages/popup.html',
    default_icon: {
      '128': 'icons/128.png'
    },
    use_navigation_bar: false
  },
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'"
}
