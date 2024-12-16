// admin/config.js
import CMS from 'decap-cms-app'

// Basic CMS configuration
CMS.init({
  config: {
    backend: {
      name: 'git-gateway',  // or 'github' if you're using GitHub
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

// Register preview
CMS.registerPreviewTemplate('blog', ({ entry }) => {
  const previewUrl = new URL('/admin/preview', window.location.origin)
  const data = entry.get('data').toJS()
  
  // Add data to URL params
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      previewUrl.searchParams.set(key, JSON.stringify(value))
    } else {
      previewUrl.searchParams.set(key, value)
    }
  })

  return (
    '<iframe  src={previewUrl.toString()} id="preview-pane" className="w-full h-screen border-0"/>'
  )
})

// Register preview styles (optional)
CMS.registerPreviewStyle('/admin/preview.css')