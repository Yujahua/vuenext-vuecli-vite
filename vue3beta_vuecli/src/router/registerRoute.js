const traverseComponents = (data, fn) => {
    data.map(item =>
      item.list && item.list.map(subItem =>
        fn(subItem)
      )
    )
  }
  
export const registerRoute = (components, demo) => {
    const routes = []
    traverseComponents(components, (component) => {
      routes.push({
        name: component.name,
        path: component.path,
        // require(`../components${component.path}/demo`).default
        component: demo[component.name] || {},
        meta: {
          title: component.name || '',
          description: component.text || ''
        }
      })
    })
    return routes
  }
  