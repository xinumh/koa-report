// 获取连接池
const pool = require('./pool')
// const config = require('./config')

const render = (ctx, handleFetchPicoImageError) =>
  // 使用连接池
  pool.use(async browser => {
    const { body, query } = ctx.request
    // console.log('ctx', ctx)
    // 打开新的页面
    const page = await browser.newPage()
    // 服务支持直接传递 HTML 字符串内容
    let html = `body`
    const {
      width = 300,
      height = 480,
      ratio: deviceScaleFactor = 2,
      type = 'png',
      filename = 'poster',
      waitUntil = 'domcontentloaded',
      quality = 100,
      omitBackground,
      fullPage,
      url,
      useCache = 'true',
      usePicoAutoJPG = 'true'
    } = query
    
    let image
    try {
      // 设置浏览器视口
      await page.setViewport({
        width: Number(width),
        height: Number(height),
        deviceScaleFactor: Number(deviceScaleFactor)
      })
      
      if (html.length > 1.25e6) {
        throw new Error('image size out of limits, at most 1MB')
      }
      
      // 访问 URL页面
      await page.goto(url || `data:text/html,${html}`, {
      	waitUntil: waitUntil.split(',')
      })
      
      // 进行截图
      image = await page.screenshot({
        type: type === 'jpg' ? 'jpeg' : type,
        quality: type === 'png' ? undefined : Number(quality),
        omitBackground: omitBackground === 'true',
        fullPage: fullPage === 'true'
      })
    } catch (error) {
      throw error
    }
    
    ctx.set('Content-Type', `image/${type}`)
    ctx.set('Content-Disposition', `inline;filename=${filename}.${type}`)
    
    await page.close()

    console.log('image', image)
    return image
  })


module.exports = render