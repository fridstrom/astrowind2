// decapcms/config.js
import "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"

window.CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      branch: 'main'
    },
    media_folder: 'public/images',
    public_folder: '/images',
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        folder: 'src/content/blog',
        create: true,
        fields: [
          { label: 'Title', name: 'title', widget: 'string' },
          { label: 'Publish Date', name: 'date', widget: 'datetime' },
          { label: 'Content', name: 'body', widget: 'markdown' }
        ]
      }
    ]
  }
})

// Register preview template using vanilla JS instead of JSX
window.CMS.registerPreviewTemplate('blog', function(props) {
  const entry = props.entry
  const data = entry.get('data').toJS()
  
  const previewUrl = new URL('/decapcms/preview', window.location.origin)
  
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      previewUrl.searchParams.set(key, JSON.stringify(value))
    } else {
      previewUrl.searchParams.set(key, String(value))
    }
  })

  // Create iframe element using DOM API
  const iframe = document.createElement('iframe')
  iframe.src = previewUrl.toString()
  iframe.id = 'preview-pane'
  iframe.style.width = '100%'
  iframe.style.height = '100vh'
  iframe.style.border = 'none'
  
  return iframe
})