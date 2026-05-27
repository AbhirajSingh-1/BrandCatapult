export const curateOptions = ['Branding', 'Identity', 'Strategy', 'Social Media', 'All']
export const audienceOptions = ['D2C Brands', 'Hospitality', 'Launch', 'All']

const audienceTitleMap = {
  'D2C Brands': ['nest', 'HappiNest', 'shishu'],
  Hospitality: ['Glaza'],
  Launch: ['Glaza', 'shishu'],
}

export function filterProjects(projects, curateFilter, audienceFilter) {
  return projects.filter((project) => {
    const curateMatch = curateFilter === 'All' || project.tags.includes(curateFilter)
    const audienceMatch = audienceFilter === 'All' || audienceTitleMap[audienceFilter]?.includes(project.title)

    return curateMatch && audienceMatch
  })
}
