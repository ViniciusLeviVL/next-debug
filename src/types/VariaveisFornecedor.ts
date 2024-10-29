import iPin from "@/types/Pin"
import iClickableMask from "@/types/ClickableMask"

export default interface VariaveisFornecedor {
  id: number
  linha_produtos: string
  nome: string
  endereco_definitivo: string
  nome_fornecedor: string
  ganalytics: string
  pixel_facebook: string
  clarity: string
  link_whats: string
  link_face: string
  tipo_modal: number
  obr_cnpj: number
  texto_cnpj: string
  obr_nome: number
  texto_nome: string
  obr_telefone: number
  texto_telefone: string
  ENTERPRISE_PHONE_NUMBER: string
  id_fornecedor: number
  botao_enviar_para: string
  titulo_pagina: string
  descricao_pagina: string
  palavras_chave: string
  nomes_arquivos: string
  ordemPaginas: []
  qtdpaginas: number
  pins: iPin[]
  clickableMasks: iClickableMask[]
  etiquetas: []
}
