import { Link, useRouteMeta, useAppData } from 'dumi';
import { prefix } from '../../styles';
import { resolve, join } from 'path'
import './index.less';


const Hero = () => {
  const { frontmatter } = useRouteMeta();

  const appdata = useAppData()

  if (!('hero' in frontmatter)) return null;

  const { name, title, logo, description, version, actions = [], features = [] } = frontmatter.hero as any

  const linkUrl = (url: string) => join(appdata.basename, url)

  return <div className={`${prefix}-hero`}>
    <div className={`${prefix}-hero-banner`}>
      <div className="main">
        <h1 className="name">{name}</h1>
        <p className="title">{title}</p>
        <p className="description">{description}
          {version && <span className="version">{version}</span>}
        </p>
        {actions && actions.length > 0 && <div className="actions">
          {
            actions.map((action: { text: string, link: string }, idx: number) => {
              return <div className="action" key={idx}>
                <a className={`medium ${idx === 0 ? 'brand' : ''}`} href={linkUrl(action.link)}>{action.text}</a>
              </div>
            })
          }
        </div>}
      </div>
      <div className="image">
        <img src={linkUrl(logo)} />
      </div>
    </div>
    {features && features.length > 0 && <div className={`${prefix}-hero-features`}>
      <div className="container">
        {
          features.map((feature: { icon: string, title: string, description: string }, idx) => {
            return <div className="item" key={idx}>
              <div className='icon'>
                {feature.icon}
              </div>
              <div className='title'>
                {feature.title}
              </div>
              <div className='description'>
                {feature.description}
              </div>
            </div>
          })
        }
      </div>
    </div>}
  </div>
}

export default Hero
