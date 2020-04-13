import Axios from 'axios'
import { extractOnlyNumbers } from '@/core/utils/formatter'

const buildSaveParams = empresa => ({
  RazaoSocial: empresa.razaoSocial,
  Cnpj: empresa.cnpj,
  CnaePrincipalCodigo: extractOnlyNumbers(empresa.cnae),
  EnderecoRua: empresa.endereco,
  EnderecoNumero: empresa.numero,
  EnderecoBairro: empresa.bairro,
  EnderecoIdCidade: empresa.cidade.id_cidade,
  EnderecoUf: empresa.uf,
  EnderecoCep: extractOnlyNumbers(empresa.cep),
  IdCorporacao: empresa.idCorporacao,
  IdStatus: empresa.status
})

export default {
  update: (empresa) => {
    const params = buildSaveParams(empresa)
    return Axios.put(`/empresa/${empresa.id}`, params)
  },
  insert: (empresa) => {
    const params = buildSaveParams(empresa)
    return Axios.post('/empresa', params)
  },
  search: possuiCorporacao => Axios.get('/empresa', { params: { possuiCorporacao } }),
  findByCnpj: cnpj => Axios.get(`/empresa/cnpj/${cnpj}`),
  findById: idEmpresa => Axios.get(`/empresa/${idEmpresa}`),
  searchEmpresasAndCorporacoes: () => Axios.get('/corporacao')
}
