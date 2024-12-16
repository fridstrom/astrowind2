// admin/config.js
import "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"

// After the CMS script is loaded, we can initialize it
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

// Register the preview template
window.CMS.registerPreviewTemplate('blog', ({ entry }) => {
  const previewUrl = new URL('/admin/preview', window.location.origin)
  const data = entry.get('data').toJS()
  
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      previewUrl.searchParams.set(key, JSON.stringify(value))
    } else {
      previewUrl.searchParams.set(key, value)
    }
  })

  return (
    <iframe 
      src={previewUrl.toString()}
      id="preview-pane"
      className="w-full h-screen border-0"
    />
  )
})