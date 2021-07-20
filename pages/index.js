import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfielRelations'
// TODO criar um componente para profilerelationsarea, que usa um objeto como propriedade e este objeto terá como propriedade um título e uma array para dados 
function ProfileSidebar(propriedade) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedade.githubUser}.png`} alt="Sem imagem" style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={"https://github.com/${propriedade.githubUser}"}>
          @{propriedade.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.slice(0, 6).map(({login: user, id, avatar_url, html_url}) => {
          return (
            <li key={id}>
              <a href={`${html_url}`}>
                <img src={avatar_url} />
                <span>{user}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: new Date().toISOString(),
    title: "Eu odeio acordar cedo",
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
  const user = 'caio86';
  // console.log(comunidades)
  // const comunidades = ['Alurakut']
  const pessoasFavoritas = [
    'peas',
    'gustavoguanabara',
    'marcobrunodev',
    'omariosouto',
    'felipefialho',
    'rafaballerini'
  ]
  const [seguidores, setSeguidores] = React.useState([])
  React.useEffect(function() {
    fetch(`https://api.github.com/users/peas/followers`)
    .then(function (respostaDoservidor) {
      return respostaDoservidor.json()
    })
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta)
    })
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={user}/>
      <MainGrid>
        {/* <Box style={{"grid-area: profileArea;"}}> */}
        <div className="profileArea" style={{ gridArea: "profileArea"}}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea"}}>
          <Box>
            <h1 className="title">Bem Vindo</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">Oque você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault()
              const dadosDoForm = new FormData(e.target)
              
              console.log("Campo: " ,dadosDoForm.get('title'))
              console.log("Campo: " ,dadosDoForm.get('image'))

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            }}>

              <div>
                <input
                  placeholder="Qual vaiser o no me das ua comunidade?"
                  name="title"
                  aria-label="Qual vaiser o no me das ua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea"}}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map(({title, image, id}) => {
                return (
                  <li key={id}>
                    <a href={`/users/${title}`}>
                      <img src={image} />
                      <span>{title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
