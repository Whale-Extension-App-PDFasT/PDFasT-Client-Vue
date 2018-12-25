
module.exports = {
  name: 'PDFasT',
  version: '3.0.1',
  description: 'PDF에서도 번역,메모,검색 등  퀵서치가 가능한 확장앱',
  author: 'KANG TAE UK, MOON YONG HO, JEON GA BIN',
  manifest_version: 2,
  icons: { '128': 'icons/128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs'
  ],
  sidebar_action: {
    default_title: 'PDFasT',
    default_page: 'pages/popup.html',
    default_icon: {
      '128': 'icons/128.png'
    },
    use_navigation_bar: false
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  // devtools_page: 'pages/devtools.html',
  // options_page: 'pages/options.html',
  content_scripts: [{
    js: [ 'js/inject.js' ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'"
  // web_accessible_resources: [ 'panel.html', 'js/content.js' ]
}
