import { languageSwitch } from './scripts/components/language-switch'
import { pokedex } from './scripts/components/pokedex'
import { search } from './scripts/components/search'
import { pokemonDialog } from './scripts/components/pokemon-dialog'

const init = () => {
    languageSwitch.init()
    pokedex.init()
    search.init()
    pokemonDialog.init()
}

init()
