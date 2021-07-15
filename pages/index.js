import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfielRelations'

function ProfileSidebar(propriedade) {
  console.log(propriedade)
  console.log(AlurakutMenu)
  return (
    <Box>
      <img src={`https://github.com/${propriedade.githubUser}.png`} alt="Sem imagem" style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const user = 'caio86';
  const pessoasFavoritas = [
    'peas',
    'gustavoguanabara',
    'marcobrunodev',
    'omariosouto',
    'felipefialho',
    'rafaballerini'
  ]

  return (
    <div>
      <AlurakutMenu />
      <MainGrid>
        {/* <Box style={{"grid-area: profileArea;"}}> */}
        <div className="profileArea" style={{ gridArea: "profileArea"}}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea"}}>
          <Box>
            <h1 class="title">Bem Vindo</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea"}}>
          <ProfileRelationsBoxWrapper>
            <h2 class="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual} >
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
    </div>
  )
}
