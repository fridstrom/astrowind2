// admin/preview-handler.js
import CMS from 'decap-cms' // Add this import

class PreviewHandler {
  constructor() {
    this.iframe = null
    this.updateDelay = 500
    this.updateTimeout = null
  }

  init(iframeId = 'preview-pane') {
    this.iframe = document.querySelector(`#${iframeId}`)
    if (!this.iframe) {
      console.error('Preview iframe not found')
      return
    }

    CMS.registerEventListener({
      name: 'preSave',
      handler: this.updatePreview.bind(this)
    })

    CMS.registerEventListener({
      name: 'change',
      handler: this.handleChange.bind(this)
    })
  }
    handleChange() {
      // Debounce updates
      clearTimeout(this.updateTimeout)
      this.updateTimeout = setTimeout(() => {
        this.updatePreview()
      }, this.updateDelay)
    }
  
    updatePreview(entry = CMS.currentEntry) {
      if (!this.iframe) return
      
      const data = entry.get('data').toJS()
      const url = new URL(this.iframe.src)
      
      // Handle complex data types
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object') {
          url.searchParams.set(key, JSON.stringify(value))
        } else {
          url.searchParams.set(key, value)
        }
      })
  
      this.iframe.src = url.toString()
    }
  }
  
  export default new PreviewHandler()