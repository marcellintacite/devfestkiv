import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventConfigService } from '../../config/event-config.service';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 py-16">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Speakers {{ eventConfig.year }}
          </h1>
          <p class="text-xl text-gray-600">
            Découvrez les intervenants de DevFest Kivu {{ eventConfig.year }}
          </p>
        </div>

        <!-- Speakers Content -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Intervenants</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Liste des intervenants confirmés pour DevFest Kivu {{ eventConfig.year }}.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            @for (s of speakers; track $index) {
            <div
              class="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm border border-gray-100"
            >
              <img
                src="{{ s.profilePicture }}"
                alt="{{ s.owner }}"
                class="w-24 h-24 rounded-full object-cover mb-4 shadow-sm"
              />
              <h3 class="text-lg font-semibold text-gray-900">{{ s.owner }}</h3>
              <p class="text-sm text-gray-700 mb-3 font-medium">{{ s.title }}</p>
              <div class="flex items-center space-x-3 mt-auto">
                @if (s.LinkedIn) {
                <a
                  href="{{ s.LinkedIn }}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline text-sm flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1 4.98 2.12 4.98 3.5zM.22 8h4.54V24H.22V8zM8.98 8h4.36v2.2h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.54v-7.6c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.91 1.97-2.91 4.01V24H8.98V8z"
                    />
                  </svg>
                  LinkedIn
                </a>
                }
              </div>
            </div>
            }
          </div>
        </div>
        <!-- Event Details -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <!-- Date -->
          <div class="text-center">
            <div class="flex items-center justify-center mb-3">
              <svg
                class="w-6 h-6 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Date</span>
            </div>
            <p class="text-lg font-semibold text-gray-900">
              {{ eventConfig.date.display.start }} {{ eventConfig.date.display.month }}
              {{ eventConfig.date.display.year }}
            </p>
            <p class="text-sm text-gray-500 mt-1">10h30 - 18h00</p>
          </div>

          <!-- Location -->
          <div class="text-center">
            <div class="flex items-center justify-center mb-3">
              <svg
                class="w-6 h-6 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Lieu</span>
            </div>
            <p class="text-lg font-semibold text-gray-900">
              {{ eventConfig.venue.conferenceCenter }}
            </p>
            <p class="text-sm text-gray-500 mt-1">{{ eventConfig.venue.fullLocation }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Speakers implements OnInit {
  eventConfig = inject(EventConfigService);
  speakers = [
    {
      owner: 'Daniella Ansima',
      title:
        "Au-delà du Prompt : Les Enjeux Éthiques et Sociaux de la Création d'Images par Intelligence Artificielle",
      description:
        'Démontrer les enjeux majeurs de la génération d’image par l’intelligence artificielle',
      TagLine: 'Web Developer',
      bio: 'Membre du GDG.',
      LinkedIn:
        'https://www.linkedin.com/in/daniella-ansima-01184129a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      profilePicture: 'https://sessionize.com/image/98cb-400o400o1-wFYhA45HmxKR8eaNVFytZh.jpg',
    },
    {
      owner: 'Yannick S. Nick King',
      title: 'IA vs Local Guides : Comment votre contribution réécrit le futur de Google Maps',
      description:
        "Nous visons à faire comprendre le rôle critique des données humaines ( venant de Local Guides) pour corriger les biais et entraîner l'IA de Google Maps.  (Prouver que l'IA ne peut pas se passer du terrain et il n'y a pas plus meilleur pour comprendre celà qu'un Développeur.",
      TagLine:
        'GDG Bukavu, Content Creator, Google Local Guide Level8, Google Trusted, Photographers Street View, Google Crowdsource Influencer (Level 25)',
      bio: 'YANNICK S., Membre du GDG Bukavu / Tech Advocate / Content Creator / Designer, Graphiste, Evenementiel ',
      LinkedIn:
        'https://www.linkedin.com/in/yannick-s-nick-king-262b1815b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      profilePicture: 'https://sessionize.com/image/dc0a-400o400o1-EhZvKMVpXgPUW89Vtn8rhm.jpg',
    },
    {
      owner: 'Fearless Alain',
      title: 'Comment digitaliser les commerces locaux grâce à l’IA ?',
      description:
        'Dans cette session, je partagerai mon parcours d’étudiant passionné de tech qui cherche à digitaliser les commerces locaux grâce à l’IA. Je montrerai comment j’ai pensé et commencé à construire zFlex, une plateforme SaaS qui vise à rendre la gestion et la vente en ligne naturelles pour les marchands et leurs clients. Au programme : Les défis concrets rencontrés en imaginant et en testant un produit digital pour un marché local. Les choix technologiques et stratégies adoptés pour rendre le SaaS efficace et accessible. Une mini démo pour illustrer comment un commerçant pourrait utiliser la plateforme au quotidien. Les leçons apprises sur le design produit, le process de développement et la mise en pratique de l’IA pour résoudre des problèmes réels. Cette session est pensée pour inspirer et guider ceux qui veulent transformer une idée en prototype fonctionnel, tout en découvrant comment la tech peut simplifier la vie de la communauté locale.',
      TagLine: 'Étudiant passionné de tech et développement web',
      bio: 'Uwezo Bisimwa Alain est étudiant en mathématiques et passionné par le développement web et les solutions numériques locales. Il travaille sur zFlex, une idée de plateforme SaaS visant à aider les commerces locaux à gérer et digitaliser leurs activités. Son intérêt se concentre sur la façon dont la technologie peut simplifier la vie des petits commerces et créer des opportunités économiques concrètes dans sa communauté.',
      LinkedIn: 'https://linkedin.com/in/fearlessalan',
      profilePicture: 'https://sessionize.com/image/b302-400o400o1-BwiidGoFEWj4NgnXAPLxAs.jpg',
    },
    {
      owner: 'Jérémie Ndeke',
      title: 'Construire des vraies compétences en dev : l’IA n’est pas un raccourci',
      description:
        'Avec l’arrivée des assistants IA, coder n’a jamais été aussi simple : une phrase, un clic… et le code apparaît. Mais pour beaucoup de nouveaux développeurs et intermediaires, cela crée une illusion de compétence : on produit du code sans réellement apprendre à le comprendre, à le corriger ou à l’améliorer. Dans cette session, nous allons explorer comment utiliser l’IA pour apprendre, et non à la place d’apprendre.',
      TagLine: '#GDGKivu, #WebDeveloper',
      bio: 'GDG Kivu organizer et web developer',
      LinkedIn:
        'https://www.linkedin.com/in/j%C3%A9r%C3%A9mie-ndeke-70a840287?lipi=urn%3Ali%3Apage%3Amw_learning_feed%3BhMV3SqxTTrWLsc0qoVEw6w%3D%3D&licu=urn%3Ali%3Acontrol%3Amw_learning_feed-view_profile',
      profilePicture: 'https://sessionize.com/image/3c68-400o400o1-wC62QEniwWYub9stL7qktH.jpg',
    },
    {
      owner: 'Marie-Grâce Bahati',
      title:
        'Les erreurs qui m’ont fait grandir en tant que dev : leçons que j’aurais aimé apprendre plus tôt.',
      description:
        'Un partage sincère sur les erreurs qui ont marqué mon parcours ,  les leçons que j’ai apprises de ces erreurs et qui m’ont aidées à progresser et à m’améliorer.',
      TagLine: 'Software Developer',
      bio: "I'm a 24 yo software developer born and raised in Bukavu, DRC but actually living in Kigali/Rwanda. I completed my primary and secondary studies in Bukavu before moving to Kigali for university, where I studied Finance. After university, in 2022, I discovered my passion for technology and completed a 10-month Software Development program at Microverse. Through hands-on projects and various professional experiences, I have grown as a developer and enjoys sharing my journey to inspire young people, especially women, to pursue careers in tech with confidence.",
      LinkedIn: 'https://www.linkedin.com/in/marie-gr%C3%A2ce-bahati/',
      profilePicture: 'https://sessionize.com/image/5e01-400o400o1-XmJp6XEHNhcNWy6zthCWE3.jpg',
    },
    {
      owner: 'Heshima Magalabaha Ezra',
      title: 'Éducation et carrière',
      description: 'Mon success Grace à la formation certifiante en remote ',
      TagLine: 'Black Born Community , CEO  et ingénieur logiciel chez matrix group ltd',
      bio: 'Heshima Magalabaha Ezra est un ingénieur logiciel et expert en intelligence artificielle originaire de la République Démocratique du Congo. Né le 23 juin 1997, il est actuellement Software Engineer chez Matrix Group Ltd au Royaume-Uni et CEO de Black Born Community, une organisation engagée dans la formation des jeunes et leur insertion professionnelle à travers le numérique. Diplômé en informatique de l’Université Catholique de Bukavu (UCB), Heshima a complété son parcours académique par plusieurs formations spécialisées en ligne dans les domaines de l’ingénierie logicielle, de la cybersécurité et de l’intelligence artificielle. Avec plus de six années d’expérience professionnelle, il a travaillé sur des projets technologiques d’envergure internationale, notamment en tant qu’ingénieur logiciel chez Always Good (États-Unis). Son expertise s’étend du développement d’applications mobiles et backend à la conception de systèmes intelligents basés sur l’IA et l’automatisation. À travers sa plateforme bbcommunity.academy￼, il œuvre pour réduire le fossé numérique en Afrique, en offrant aux jeunes des opportunités concrètes d’apprentissage, de création d’emploi et d’émancipation professionnelle. Reconnu pour sa vision innovante et son leadership engagé, Heshima Magalabaha Ezra incarne une nouvelle génération d’ingénieurs africains déterminés à utiliser la technologie comme moteur de transformation sociale et économique.',
      LinkedIn: 'https://linkedin.com/in/heshimakob/',
      profilePicture: 'https://sessionize.com/image/a1ae-400o400o1-VzBrSBb484Kt1J5LJHkWbZ.jpg',
    },
    {
      owner: 'Christian Rusipa Jerry',
      title:
        'RESILIENCE & ADAPTABILITE DE DEVELOPPEURS DANS UN MONDE EN PLEINE REVOLUTION DIGITALE',
      description:
        "Dans cette session, nous envisageons échanger avec les newbies dans le domaine  sur l'importance d'être résilient face aux différents défaits que présente le domaine informatique dans une  communauté où la majorité de la population n'utilise pas l'outil informatique mais également la souplesse dans l'adaptabilité aux différents changements et innovation que ce domaine est en train de subir du jours au lendemain.",
      TagLine: 'Kwetu-Tech, Founder  & Project Manager',
      bio: "Christian Rusipa est un Jeune de la Republique democratique du Congo, passionné de l'informatique depuis son jeune âge. Il detient un diplome de Bachelor of Information Technology (IT) de l'Université de St. Lawrence Univeristy -SLAU, Kampala, Uganda, promotion de 2016. Depuis 2019, Il  est fondateur de KWETU-TECH(https://kwetutech.com), une entreprise specialisée dans l'etude, conception, developpement et maintenance des systemes informatiques, basée à Bukavu, Sud-Kivu. Kwetu-Tech a deja mis au points plusieurs solutions telles que Smart-Duka, easyChick, kwetuEvent, KwetuTicket, smartBuguza, etc. Certaines des leurs solutions sont utilisées dans le secteur privé et d'autres dans le secteur public.",
      LinkedIn: 'https://www.linkedin.com/in/christian-rusipa-136366b1/',
      profilePicture: 'https://sessionize.com/image/a2ae-400o400o1-fUbwSCiXMvcg8ATYc3mT5B.jpg',
    },
    {
      owner: 'Raphael AMISI CABWINE',
      title: '',
      description: '',
      TagLine: 'CEO & Founder at Congo Cloud Computer sarl',
      bio: '',
      LinkedIn:
        'https://www.linkedin.com/in/raphael-amisi-cabwine-107b4693?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      profilePicture:
        'https://media.licdn.com/dms/image/v2/D4D03AQE5ZZnSl4g9DA/profile-displayphoto-scale_400_400/B4DZl2LMicIgAk-/0/1758624272756?e=1765411200&v=beta&t=AC6NnjgYaJq2IngI_6USR5-BUpmZnasZtux6gaCFtpE',
    },
  ];

  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
