from pydantic import BaseModel


class BannerSchema(BaseModel):

    supertitulo: str
    titulo: str
    subtitulo: str
    link_pdf: str
    o_que: str
    por_que: str
    para_quem: str


class ObjetivosSchema(BaseModel):

    transparencia: str
    visao_sistemica: str
    otimizacao: str
    execucao: str

class ComoFeitoCardSchema(BaseModel):

    numero: str
    titulo: str
    conteudo: str
    detalhe: str

class ComoFeitoSchema(BaseModel):

    texto: str
    cards: list[ComoFeitoCardSchema]

class IndicadoresSchema(BaseModel):

    texto: str
    subtitulo: str
    chamada_subsecao: str
    conteudo_subsecao: str

class ParticipacaoSchema(BaseModel):

    texto: str
    conteudo_audiencias: str
    link_video_audiencias: str
    conteudo_devolutivas: str


class SecaoSobreSchema(BaseModel):

    banner: BannerSchema
    objetivos: ObjetivosSchema
    como_feito: ComoFeitoSchema
    indicadores: IndicadoresSchema
    participacao: ParticipacaoSchema