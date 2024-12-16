import PreviewHandler from './preview-handler'

// Register preview templates
CMS.registerPreviewTemplate('blog', ({ entry }) => {
  return (
    <iframe 
      id="preview-pane"
      src="/admin/preview"
      className="w-full h-screen border-0"
    />
  )
})

// Initialize preview handler
PreviewHandler.init()