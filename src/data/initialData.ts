import { PillarInfo, Project, AliveEvent, ImpactMetric, GalleryItem, NewsPost } from '../types';

export const INITIAL_PILLARS: Record<'saude' | 'educacao' | 'cultura', PillarInfo> = {
  saude: {
    id: 'saude',
    name: 'Saúde',
    badge: '💚 Saúde & Vida',
    tagline: 'Cuidar também é transformar.',
    description: 'Promovemos o bem-estar físico e emocional de jovens por meio de escuta ativa, práticas corporais, saúde mental integrativa, rodas de conversa e incentivo a hábitos que sustentam a vida.',
    color: '#1E6E28',
    bgGlow: 'rgba(30, 110, 40, 0.08)',
    borderColor: 'border-[#1E6E28]/25 hover:border-[#1E6E28]',
    textColor: 'text-[#1E6E28]',
    icon: 'HeartPulse',
    topics: ['Saúde Mental & Acolhimento', 'Esportes Urbanos & Respiração', 'Conscientização & Prevenção', 'Nutrição & Autocuidado'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'
  },
  cultura: {
    id: 'cultura',
    name: 'Cultura',
    badge: '🎨 Cultura & Arte',
    tagline: 'Expressar também é viver.',
    description: 'Espaço vivo de experimentação artística, arte urbana, música, audiovisual, teatro e slam. Acreditamos que a arte é ferramenta primária de identidade, voz coletiva e emancipação juvenil.',
    color: '#E5531B',
    bgGlow: 'rgba(229, 83, 27, 0.08)',
    borderColor: 'border-[#E5531B]/25 hover:border-[#E5531B]',
    textColor: 'text-[#E5531B]',
    icon: 'Palette',
    topics: ['Artes Visuais & Murais Urbanos', 'Laboratório Audiovisual & Podcast', 'Slam, Poesia & Literatura Marginal', 'Música & Ritmos Periféricos'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop'
  },
  educacao: {
    id: 'educacao',
    name: 'Educação',
    badge: '📚 Educação & Saber',
    tagline: 'Conhecimento abre caminhos.',
    description: 'Despertamos o potencial criativo e profissional dos jovens através de metodologias ativas, alfabetização digital, comunicação não violenta, empreendedorismo comunitário e formação para o futuro.',
    color: '#F09E12',
    bgGlow: 'rgba(240, 158, 18, 0.08)',
    borderColor: 'border-[#F09E12]/25 hover:border-[#F09E12]',
    textColor: 'text-[#F09E12]',
    icon: 'BookOpen',
    topics: ['Tecnologia & Criatividade Digital', 'Mentoria de Carreira & Futuro', 'Liderança Comunitária', 'Cursos Livres & Oficinas'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'eco-mentes',
    title: 'EcoMentes & Escuta',
    pilar: 'saude',
    summary: 'Rodas de acolhimento emocional, oficinas de mindfulness e rodas de conversa sobre saúde mental descomplicada para jovens.',
    description: 'O projeto EcoMentes cria espaços seguros e confidenciais onde jovens da periferia e de escolas públicas podem dialogar livremente sobre ansiedade, pressões sociais, projeto de vida e bem-estar. Conduzido por psicólogos voluntários e facilitadores artísticos, o projeto combina meditação guiada, dinâmicas de grupo e expressão corporal.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    year: '2024–2026',
    location: 'Comunidades & Centros Culturais',
    beneficiaries: '+620 jovens atendidos',
    tags: ['Saúde Mental', 'Acolhimento', 'Autocuidado', 'Juventude'],
    impactHighlight: 'Redução de 78% nos relatos de isolamento emocional entre os participantes.',
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'lab-criativo-futuro',
    title: 'Lab Criativo & Tech',
    pilar: 'educacao',
    summary: 'Capacitação prática em programação criativa, design visual, inteligência artificial e criação de conteúdo digital.',
    description: 'Uma imersão prática de 12 semanas onde jovens constroem projetos digitais autorais: desde websites e identidades visuais até ferramentas digitais voltadas para resolver desafios reais de suas próprias comunidades. Inclui mentorias individuais com profissionais atuantes no mercado criativo e tecnológico.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    year: '2025–2026',
    location: 'Hub Digital ALIVE',
    beneficiaries: '+480 jovens formados',
    tags: ['Tecnologia', 'Design', 'Criatividade', 'Mercado de Trabalho'],
    impactHighlight: '85% dos formados conquistaram oportunidades de estágio ou trabalho freelancer.',
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'vozes-da-rua',
    title: 'Vozes Urbanas & Murais',
    pilar: 'cultura',
    summary: 'Intervenções de arte pública, murais de graffiti sustentável, oficinas de slam poetry e produção musical independente.',
    description: 'Transformamos muros e espaços públicos em galerias a céu aberto de esperança e reflexão. Jovens artistas aprendem técnicas de pintura mural, história da arte contemporânea, métrica poética para slam e gravação de beats em estúdio comunitário montado pelo ALIVE.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    year: '2024–2026',
    location: 'Espaços Públicos & Galerias Urbanas',
    beneficiaries: '+1.200 pessoas impactadas',
    tags: ['Arte Urbana', 'Graffiti', 'Música', 'Cultura Hip-Hop'],
    impactHighlight: '14 murais artísticos revitalizados e 2 álbuns coletivos gravados.',
    gallery: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'corpo-movimento',
    title: 'Corpo & Ritmo Consciente',
    pilar: 'saude',
    summary: 'Dança urbana, yoga comunitária e treinos funcionais ao ar livre para fortalecer corpo, mente e conexão coletiva.',
    description: 'Uma proposta de atividade física livre de padrões estéticos tóxicos, focada no prazer do movimento, postura, respiração e celebração da diversidade corporal. Realizada aos fins de semana em praças públicas e centros esportivos comunitários.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    year: '2025–2026',
    location: 'Parques e Praças Públicas',
    beneficiaries: '+350 participantes semanais',
    tags: ['Esporte', 'Dança', 'Saúde Física', 'Comunidade'],
    impactHighlight: 'Melhora comprovada de 82% na qualidade de sono e disposição física.',
  },
  {
    id: 'trilhas-futuro',
    title: 'Trilhas do Saber & Oratória',
    pilar: 'educacao',
    summary: 'Workshops de oratória, escrita criativa, pensamento crítico e preparação para vestibulares e processos seletivos.',
    description: 'Capacitamos jovens a expressar suas ideias com clareza, confiança e autoridade. O projeto oferece simulações de entrevistas, redação criativa para o ENEM e debates estruturados inspirados em modelos das Nações Unidas.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    year: '2024–2026',
    location: 'Bibliotecas Públicas & Escolas',
    beneficiaries: '+520 estudantes',
    tags: ['Oratória', 'Comunicação', 'Educação Cidadã', 'Futuro'],
    impactHighlight: 'Mais de 140 aprovações em faculdades públicas e bolsas integrais.',
  },
  {
    id: 'cine-comunidade',
    title: 'CineLab ALIVE',
    pilar: 'cultura',
    summary: 'Oficinas de roteiro, captação de vídeo com smartphones e mostras de cinema itinerante com debates abertos.',
    description: 'Ensinamos a juventude a contar suas próprias narrativas em primeira pessoa usando a tecnologia que já têm no bolso. O projeto culmina na Mostra Anual de Curtas ALIVE, exibindo documentários e ficções criadas pelos alunos para toda a comunidade.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    year: '2025–2026',
    location: 'Centros Culturais & Escolas',
    beneficiaries: '+30 curtas produzidos',
    tags: ['Cinema', 'Audiovisual', 'Narrativas', 'Documentário'],
    impactHighlight: 'Filmes selecionados para 3 festivais independentes de cinema juvenil.',
  }
];

export const INITIAL_EVENTS: AliveEvent[] = [
  {
    id: 'festival-alive-2026',
    title: 'Festival ALIVE: Cultura em Movimento',
    date: '28 Março 2026',
    time: '14:00 às 21:00',
    location: 'Parque Cultural Central — Palco Aberto',
    pilar: 'cultura',
    description: 'Grande celebração com apresentações de slam, batalha de rimas, feira de artes visuais, pocket shows e intervenções de graffiti ao vivo com jovens artistas do projeto.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
    featured: true,
    vacancies: 300,
    enrolledCount: 214,
    status: 'open',
    targetAudience: 'Aberto a todos os jovens e famílias',
    instructor: 'Coletivo ALIVE + Artistas Convidados'
  },
  {
    id: 'bootcamp-ia-criativa',
    title: 'Bootcamp: IA & Ferramentas Criativas',
    date: '12 Abril 2026',
    time: '09:00 às 13:00',
    location: 'Hub Digital ALIVE (Sala Multimídia)',
    pilar: 'educacao',
    description: 'Aprenda a utilizar prompts inteligentes, design generativo e automações criativas para impulsionar seus projetos artísticos e portfólio profissional.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vacancies: 35,
    enrolledCount: 29,
    status: 'open',
    targetAudience: 'Jovens de 15 a 24 anos com interesse em tecnologia',
    instructor: 'Lucas Andrade (Designer & Desenvolvedor)'
  },
  {
    id: 'oficina-respirar-viver',
    title: 'Encontro: Respiração, Ansiedade & Corpo',
    date: '18 Abril 2026',
    time: '15:30 às 18:00',
    location: 'Espaço Terapêutico ALIVE (Sala Zen)',
    pilar: 'saude',
    description: 'Técnicas práticas de respiração consciente, relaxamento muscular progressivo e estratégias comprovadas para gerenciar crises de ansiedade no dia a dia.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vacancies: 25,
    enrolledCount: 20,
    status: 'open',
    targetAudience: 'Estudantes e jovens em período pré-vestibular/trabalho',
    instructor: 'Dra. Camila Nogueira (Psicóloga Clínica)'
  },
  {
    id: 'mostra-audiovisual-alive',
    title: 'Mostra CineLab: Narrativas Periféricas',
    date: '02 Maio 2026',
    time: '18:30 às 21:30',
    location: 'Cine Teatro Municipal',
    pilar: 'cultura',
    description: 'Exibição dos 6 novos curtas-metragens produzidos pelos alunos da turma 2025/2, com debate após a sessão com os jovens diretores e produtores.',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vacancies: 150,
    enrolledCount: 88,
    status: 'open',
    targetAudience: 'Comunidade geral e entusiastas de cinema',
    instructor: 'Turma de Audiovisual ALIVE'
  },
  {
    id: 'encontro-juventude-2025',
    title: '1º Encontro Estadual Juventude & Futuro',
    date: '14 Novembro 2025',
    time: '08:30 às 17:00',
    location: 'Auditório Central das Artes',
    pilar: 'educacao',
    description: 'Edição histórica com palestras de lideranças juvenis, feira de projetos sociais e formulação do Manifesto Jovem ALIVE 2026.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vacancies: 200,
    enrolledCount: 200,
    status: 'finished',
    targetAudience: 'Estudantes, educadores e coletivos',
    instructor: 'Rede ALIVE + Convidados'
  },
  {
    id: 'mutirao-saude-emocional-2025',
    title: 'Mutirão Comunitário de Saúde & Escuta Ativa',
    date: '05 Outubro 2025',
    time: '09:00 às 16:00',
    location: 'Parque Ecológico Municipal',
    pilar: 'saude',
    description: 'Mais de 180 atendimentos de acolhimento psicológico voluntário, práticas integrativas e distribuição de cartilhas de bem-estar.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vacancies: 180,
    enrolledCount: 180,
    status: 'finished',
    targetAudience: 'Moradores e famílias da comunidade',
    instructor: 'Corpo Clínico Voluntário ALIVE'
  },
  {
    id: 'batalha-rimas-verao-2025',
    title: 'Batalha ALIVE de Slam & Rima da Quebrada',
    date: '20 Dezembro 2025',
    time: '18:00 às 22:00',
    location: 'Praça das Bandeiras — Arena Hip-Hop',
    pilar: 'cultura',
    description: 'Competição poética e musical premiando 3 jovens poetas com gravação de EP em estúdio profissional.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    featured: false,
    vacancies: 250,
    enrolledCount: 250,
    status: 'finished',
    targetAudience: 'Artistas, poetas e comunidade',
    instructor: 'Mestres de Cerimônia do ALIVE'
  }
];

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'metric-jovens',
    label: 'Jovens Alcançados Diretamente',
    value: 2840,
    prefix: '+',
    suffix: '',
    description: 'Participantes ativos em oficinas regulares, atendimentos e palestras.',
    pilar: 'geral'
  },
  {
    id: 'metric-acoes',
    label: 'Ações e Oficinas Realizadas',
    value: 168,
    prefix: '+',
    suffix: '',
    description: 'Encontros práticos nos pilares de Saúde, Educação e Cultura.',
    pilar: 'geral'
  },
  {
    id: 'metric-comunidades',
    label: 'Comunidades & Polos Atendidos',
    value: 16,
    prefix: '',
    suffix: ' regiões',
    description: 'Atuação descentralizada levando transformação onde ela é necessária.',
    pilar: 'geral'
  },
  {
    id: 'metric-impacto-positivo',
    label: 'Índice de Transformação Positiva',
    value: 96,
    prefix: '',
    suffix: '%',
    description: 'Jovens que relatam melhora direta em confiança, saúde ou perspectiva de futuro.',
    pilar: 'geral'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Oficina de Graffiti & Arte Urbana',
    category: 'arte',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'tall',
    date: 'Fevereiro 2026',
    pilar: 'cultura',
    caption: 'Intervenção visual coletiva no muro da escola parceira.'
  },
  {
    id: 'gal-2',
    title: 'Roda de Acolhimento EcoMentes',
    category: 'oficinas',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'wide',
    date: 'Janeiro 2026',
    pilar: 'saude',
    caption: 'Diálogos francos sobre sentimentos, ansiedade e empatia.'
  },
  {
    id: 'gal-3',
    title: 'Hackathon & Programação Criativa',
    category: 'oficinas',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'square',
    date: 'Fevereiro 2026',
    pilar: 'educacao',
    caption: 'Desenvolvendo soluções digitais autorais para o bairro.'
  },
  {
    id: 'gal-4',
    title: 'Apresentação de Slam & Poesia Marginal',
    category: 'eventos',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'tall',
    date: 'Dezembro 2025',
    pilar: 'cultura',
    caption: 'Palco aberto onde cada jovem solta a sua voz sem filtros.'
  },
  {
    id: 'gal-5',
    title: 'Treino Funcional & Movimento ao Ar Livre',
    category: 'comunidade',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'wide',
    date: 'Janeiro 2026',
    pilar: 'saude',
    caption: 'Saúde corporal democrática na praça pública.'
  },
  {
    id: 'gal-6',
    title: 'Bastidores da Produção Audiovisual',
    category: 'bastidores',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'square',
    date: 'Novembro 2025',
    pilar: 'cultura',
    caption: 'Jovens dirigindo câmeras, iluminação e captação de áudio.'
  }
];

export const INITIAL_NEWS: NewsPost[] = [
  {
    id: 'noticia-1',
    title: 'Como a união entre Arte e Saúde Mental está ressignificando o futuro dos jovens',
    slug: 'arte-saude-mental-futuro-jovens',
    category: 'Reflexão & Saúde',
    summary: 'Descubra como o projeto ALIVE integra psicologia preventiva e oficinas de pintura para acolher sentimentos e criar conexões reais.',
    content: `No cenário atual, a juventude enfrenta desafios sem precedentes relacionados à ansiedade, pressões digitais e incertezas sobre o futuro. No ALIVE, compreendemos que o cuidado com a mente não pode ser burocrático ou inacessível.

Ao conectar a Saúde Mental (Pilar 01) à Cultura (Pilar 03), abrimos espaço para que sentimentos complexos encontrem tradução em cores, versos de slam e movimentos de dança. A arte se torna uma ponte segura para o diálogo e a cura coletiva.

Nos últimos seis meses, mais de 400 jovens participaram das oficinas EcoMentes, relatando não apenas alívio emocional, mas também o fortalecimento de laços de amizade duradouros. Cuidar também é transformar.`,
    author: 'Equipe de Comunicação ALIVE',
    date: '15 Março 2026',
    readTime: '4 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
    pilar: 'saude',
    tags: ['Saúde Mental', 'Arte-Terapia', 'Juventude', 'Bem-Estar']
  },
  {
    id: 'noticia-2',
    title: 'Inscrições abertas para o Lab Criativo & Tech: bolsas 100% gratuitas para formação digital',
    slug: 'inscricoes-abertas-lab-criativo-tech',
    category: 'Oportunidades & Formação',
    summary: 'Nova turma oferece vagas para jovens entre 16 e 24 anos com foco em Inteligência Artificial, programação criativa e design para impacto social.',
    content: `Estão oficialmente abertas as inscrições para o primeiro ciclo do Lab Criativo & Tech 2026. A formação é totalmente gratuita e voltada prioritariamente para estudantes de escolas públicas e moradores de regiões periféricas.

Durante os três meses de curso, os participantes terão acesso a computadores de alta performance, internet rápida, mentorias com profissionais do mercado de tecnologia e alimentação no local.

O objetivo do ALIVE é democratizar o acesso às profissões do futuro, garantindo que a tecnologia seja uma ferramenta de emancipação econômica e protagonismo jovem.`,
    author: 'Coordenação Pedagógica',
    date: '08 Março 2026',
    readTime: '3 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    pilar: 'educacao',
    tags: ['Tecnologia', 'Educação', 'Bolsas de Estudo', 'Futuro']
  },
  {
    id: 'noticia-3',
    title: 'Vozes Urbanas: 14 murais artísticos renovam as cores de comunidades parceiras',
    slug: 'vozes-urbanas-murais-arte-publica',
    category: 'Cultura & Cidade',
    summary: 'Ação coletiva de graffiti e poesia visual transforma espaços urbanos degradados em pontos de encontro, orgulho comunitário e beleza.',
    content: `A cidade é uma tela viva. Com esse pensamento, o coletivo de arte urbana do ALIVE concluiu mais uma etapa do projeto Vozes Urbanas, entregando 14 novos murais em diferentes bairros.

Cada mural foi co-criado em oficinas com os próprios moradores locais, homenageando figuras históricas da comunidade, a fauna nativa e mensagens de esperança. 

"Ver um muro que antes estava cinza e abandonado se transformar em um portal de cores muda a energia de quem passa por aqui todos os dias", relata Mariana, 19 anos, uma das artistas participantes.`,
    author: 'Núcleo de Artes Visuais',
    date: '28 Fevereiro 2026',
    readTime: '5 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop',
    pilar: 'cultura',
    tags: ['Arte Pública', 'Graffiti', 'Cultura', 'Comunidade']
  }
];
