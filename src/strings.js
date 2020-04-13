export const STATUS_EMPRESA = {
  TODAS: -1,
  ATIVA: 1,
  INATIVA: 2,
  BLOQUEADA: 3
}

export const COMMON_STATUS = {
  ATIVA: 1,
  INATIVA: 2
}

export const STATUS_FUNCIONARIO = [
  {
    id: 1,
    sigla: 'A',
    label: 'Ativado',
    css: 'ativado',
    nome: 'ATIVADO',
    color: 'green'
  },
  {
    id: 2,
    sigla: 'T',
    label: 'Desativado',
    css: 'desativado',
    nome: 'DESATIVADO',
    color: 'red'
  },
  {
    id: 3,
    sigla: 'F',
    label: 'Afastado',
    css: 'afastado',
    nome: 'AFASTADO',
    color: 'MediumSlateBlue'
  },
  {
    id: 4,
    sigla: 'D',
    label: 'Férias',
    css: 'ferias',
    nome: 'FERIAS',
    color: 'LightCoral'
  }
]

export default {
  estados: [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ],
  STATUS_EMPRESA
}
