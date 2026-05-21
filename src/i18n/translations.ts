export const LANGUAGES = ["en", "es"] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = "en";

interface Dictionary {
    [key: string]: string | Dictionary;
}

export const translations: Record<Lang, Dictionary> = {
    en: {
        nav: {
            home: "Home",
            projects: "Projects",
            about: "About Me",
            contact: "Contact",
            menu: "Menu",
            language: {
                aria: "Change language",
                title: "Change language",
            },
        },
        hero: {
            subtitle: "Gameplay Programmer and Game Dev Student",
            quote:
                "Creating playable worlds, one line of code at a time, refined through playtests",
            cta: {
                projects: "View Projects",
                contact: "Contact Me",
            },
        },
        home: {
            sections: {
                tools: "Tools & Technologies",
                about: "About Me",
                featured: "Featured Projects",
                aboutWork: "About Me & My Work",
                contact: "Contact",
            },
            about: {
                short:
                    "Gameplay programmer and game development student building university and personal prototypes in Unity, Unreal Engine, and Phaser. Calm, collaborative, and focused on solid gameplay feel, level design, and thoughtful systems.",
                readMore: "Read more about me →",
            },
            projects: {
                viewAll: "View All Projects →",
            },
            categories: {
                engine: "Game Engines",
                programming: "Programming Languages",
                tools: "Tools & Workflow",
            },
            dropdown: {
                education: "My Education",
                teamwork: {
                    title: "Teamwork",
                    body:
                        "Calm and introverted, so I listen first and share honest feedback when it helps the project. Used to university teams (3-8 people) working with Agile methods (Scrum/Kanban) and tools like Jira, GitLab, and GitHub. I enjoy bridging gameplay programming, game design, and production to keep the vision coherent.",
                },
            },
        },
        images: {
            mainPortrait: "Main profile portrait",
        },
        about: {
            sections: {
                about: "About Me",
                specializations: "Specializations",
                education: "Education",
                technologies: "Technologies",
                qa: "Q&A",
                find: "Find Me",
                contact: "Contact",
            },
            profile: {
                professional: {
                    suffix: "Professional",
                    alt: "Professional profile portrait",
                    p1:
                        "I'm a gameplay programmer and game development student at ENTI-UB in Barcelona. I focus on building gameplay systems, player feel, and rapid prototypes that can be tested early.",
                    p2:
                        "My background in game design helps me translate ideas into mechanics, and I've led small university teams (3-8 people) as a producer, keeping scope and priorities clear.",
                },
                personal: {
                    suffix: "Personal",
                    alt: "Personal profile portrait",
                    p1:
                        "I'm calm and introverted, so I tend to listen first and then share honest feedback when it helps the project. I enjoy teams where ideas are discussed openly and decisions are explained.",
                    p2:
                        "Japanese culture inspires a lot of my aesthetic choices, and I want this portfolio to feel personal rather than generic.",
                },
                projects: {
                    suffix: "Projects & Experience",
                    alt: "Project-focused profile portrait",
                    p1:
                        "All the projects here are prototypes made at university or in my free time. I enjoy level design, playtesting sessions, and iterating based on feedback.",
                    p2:
                        "Tools I use most are Unity, Unreal Engine, Phaser, C#, C++, and Processing. I also use Audacity for basic audio editing.",
                },
                prev: "Previous photo",
                next: "Next photo",
            },
            categories: {
                programming: "Programming Languages",
                engine: "Engines & Frameworks",
                design: "Design Tools",
                tools: "Dev Tools",
            },
        },
        specializations: {
            programmer: {
                title: "Programmer",
                description:
                    "Gameplay-focused programmer building systems, prototypes, and player feel with C# and C++ across Unity, Unreal, and Phaser.",
            },
            designer: {
                title: "Designer",
                description:
                    "Game design foundations with emphasis on mechanics, level design, and playtesting feedback loops.",
            },
            producer: {
                title: "Producer",
                description:
                    "Led small university teams (3-8 people), organizing scope, priorities, and decisions around a clear vision.",
            },
        },
        education: {
            ddvja: {
                title: "DDVJA — Degree in Video Game Design and Development",
                institution: "ENTI-UB (Barcelona)",
                period: "2023 — Present",
                description:
                    "Game development student in third year, focused on gameplay programming, game design, production, and rapid prototyping across multiple engines.",
            },
            damviod: {
                title: "DAM-VIOD — Cross-platform Application Development",
                institution: "ENTI-UB (Barcelona)",
                period: "2021 — 2023",
                description:
                    "Higher degree focused on application development, databases, and software engineering, with a specialization in video game development.",
            },
            bachillerato: {
                title: "Bachillerato Tecnológico",
                institution: "INS Leonardo da Vinci (Sant Cugat del Vallès)",
                period: "2019 — 2021",
                description:
                    "Technology-focused baccalaureate with foundations in math, physics, and early programming exposure.",
            },
        },
        skills: {
            csharp: { description: "Primary language for Unity game development" },
            cpp: { description: "Used in Unreal Engine and low-level systems" },
            javascript: { description: "Web-based game development with Phaser" },
            processing: {
                description: "Creative coding for university prototypes and experiments",
            },
            html5: { description: "Structure for web-based projects" },
            css3: { description: "Styling and visual design for the web" },
            unity: { description: "2D/3D game engine — my main development tool" },
            unreal: { description: "AAA-grade engine for high-fidelity projects" },
            phaser: { description: "HTML5 framework for browser-based games" },
            blender: { description: "3D modeling, animation, and rendering" },
            photoshop: { description: "Image editing and texture creation" },
            aseprite: { description: "Pixel art and sprite animation tool" },
            git: { description: "Version control for all projects" },
            github: { description: "Code hosting and collaboration platform" },
            gitlab: { description: "CI/CD and project management" },
            jira: { description: "Agile project management and task tracking" },
            audacity: { description: "Basic audio editing and cleanup" },
            visualstudio: { description: "IDE for C# and C++ development" },
        },
        qa: {
            games: {
                question: "What type of games are you most interested in?",
                answer:
                    "I gravitate toward survival and open-world experiences. My favorite series include Fallout, Metro, BioShock, Destiny, and The Legend of Zelda, so I enjoy exploration, systems, and strong atmosphere.",
            },
            internships: {
                question: "Are you open to internships or collaborations?",
                answer:
                    "I'm not actively looking for full-time work yet, but I'm open to messages and collaborations. I'll also be looking for external university internships soon.",
            },
            role: {
                question: "What role do you usually take in a team?",
                answer:
                    "Gameplay programmer first, with game design input. I've also led small university teams (3-8 people) as a producer, helping keep scope and priorities clear.",
            },
            prototyping: {
                question: "How do you approach prototyping and iteration?",
                answer:
                    "I like to build a small, playable prototype early, then playtest and iterate based on feedback. Level design and player flow are areas I keep refining.",
            },
            teamwork: {
                question: "How do you work with teams?",
                answer:
                    "I'm calm and introverted, so I listen first and then give honest feedback. I'm comfortable working in groups and value clear communication and shared decisions.",
            },
            tools: {
                question: "What tools do you enjoy using?",
                answer:
                    "Unity, Unreal Engine, and Phaser are my main engines. I code in C# and C++, and I also use Processing for creative coding and Audacity for quick audio edits.",
            },
        },
        contactSummary: {
            title: "Get In Touch",
            body:
                "Not looking for full-time work yet, but open to messages, collaborations, and upcoming university internships.",
        },
        projects: {
            title: "Projects",
            filter: { all: "All" },
            empty: "No projects found for this engine.",
            view: "View Project",
        },
        contact: {
            title: "Contact",
            email: {
                title: "Email",
                copyTitle: "Copy email",
                copySuccess: "✓ Copied to clipboard!",
                copyError: "Failed to copy. Select the email manually.",
            },
            professional: { title: "Professional" },
            social: { title: "Social Media" },
            direct: { title: "Direct Message" },
            form: {
                subject: "New message from Portfolio",
                fromName: "Portfolio Contact Form",
                name: { label: "Name", placeholder: "Your name" },
                email: { label: "Email", placeholder: "your@email.com" },
                message: { label: "Message", placeholder: "Write your message..." },
                submit: "Send Message",
                sending: "Sending...",
                success: "✓ Message sent! I'll get back to you soon.",
                error: "Something went wrong. Try again or email directly.",
                networkError: "Network error. Try again later.",
            },
        },
        footer: {
            nav: "Navigation",
            social: "Social",
            contact: "Contact",
            copyTitle: "Click to copy email",
            copySuccess: "✓ Copied!",
            copyError: "Failed to copy",
            copyright: "All rights reserved.",
        },
        notFound: {
            title: "Page Not Found",
            body: "The page you're looking for doesn't exist or has been moved.",
            back: "← Back to Home",
        },
    },
    es: {
        nav: {
            home: "Inicio",
            projects: "Proyectos",
            about: "Sobre mí",
            contact: "Contacto",
            menu: "Menú",
            language: {
                aria: "Cambiar idioma",
                title: "Cambiar idioma",
            },
        },
        hero: {
            subtitle: "Programador de Gameplay y Estudiante de Desarrollo de Videojuegos",
            quote:
                "Creando mundos jugables, línea a línea, perfeccionados a través del playtesting",
            cta: {
                projects: "Ver proyectos",
                contact: "Contactar",
            },
        },
        home: {
            sections: {
                tools: "Herramientas y tecnologías",
                about: "Sobre mí",
                featured: "Proyectos destacados",
                aboutWork: "Sobre mí y mi trabajo",
                contact: "Contacto",
            },

            about: {
                short:
                    "Programador de gameplay y estudiante de desarrollo de videojuegos, centrado en crear prototipos personales y universitarios con Unity, Unreal Engine y Phaser. Tranquilo, colaborativo y enfocado en ofrecer buenas sensaciones al jugar, diseño de niveles cuidado y sistemas con intención.",
                readMore: "Saber más sobre mí →",
            },
            projects: {
                viewAll: "Ver todos los proyectos →",
            },
            categories: {
                engine: "Motores de juego",
                programming: "Lenguajes de programación",
                tools: "Herramientas y flujo de trabajo",
            },
            dropdown: {
                education: "Mi formación",
                teamwork: {
                    title: "Trabajo en equipo",
                    body:
                        "Soy tranquilo e introvertido, así que primero escucho y luego doy feedback honesto cuando ayuda al proyecto. Estoy acostumbrado a equipos universitarios (3-8 personas) trabajando con métodos ágiles (Scrum/Kanban) y herramientas como Jira, GitLab y GitHub. Me gusta unir programación de gameplay, diseño de juego y producción para mantener una visión coherente.",
                },
            },
        },
        images: {
            mainPortrait: "Retrato principal",
        },
        about: {
            sections: {
                about: "Sobre mí",
                specializations: "Especializaciones",
                education: "Educación",
                technologies: "Tecnologías",
                qa: "Preguntas y respuestas",
                find: "Encuéntrame",
                contact: "Contacto",
            },
            profile: {
                professional: {
                    suffix: "Profesional",
                    alt: "Retrato de perfil profesional",
                    p1:
                        "Soy programador de gameplay y estudiante de desarrollo de videojuegos en ENTI-UB, Barcelona. Me especializo en crear sistemas de juego, mejorar el game feel y desarrollar prototipos rápidos que puedan probarse desde fases tempranas.",
                    p2:
                        "Mi formación en diseño de videojuegos me ayuda a convertir ideas en mecánicas jugables, y he coordinado pequeños equipos universitarios (3-8 personas) como productor, manteniendo claros tanto el alcance como las prioridades.",
                },
                personal: {
                    suffix: "Personal",
                    alt: "Retrato de perfil personal",
                    p1:
                        "Soy una persona tranquila e introvertida, así que suelo escuchar primero y aportar feedback sincero cuando creo que puede ayudar al proyecto. Disfruto trabajando en equipos donde las ideas se debaten abiertamente y las decisiones se comunican con claridad.",
                    p2:
                        "La cultura japonesa inspira gran parte de mis decisiones estéticas, y quiero que este portfolio transmita una identidad personal en lugar de sentirse genérico.",
                },
                projects: {
                    suffix: "Proyectos y experiencia",
                    alt: "Retrato centrado en proyectos",
                    p1:
                        "Todos los proyectos que aparecen aquí son prototipos desarrollados en la universidad o durante mi tiempo libre. Disfruto especialmente del diseño de niveles, las sesiones de playtesting y la iteración basada en feedback.",
                    p2:
                        "Las herramientas que más utilizo son Unity, Unreal Engine, Phaser, C#, C++ y Processing. También uso Audacity para edición básica de audio.",
                },
                prev: "Foto anterior",
                next: "Foto siguiente",
            },
            categories: {
                programming: "Lenguajes de programación",
                engine: "Motores y frameworks",
                design: "Herramientas de diseño",
                tools: "Herramientas de desarrollo",
            },
        },
        specializations: {
            programmer: {
                title: "Programador",
                description:
                    "Programador centrado en gameplay, creando sistemas, prototipos y buenas sensaciones de juego con C# y C++ en Unity, Unreal y Phaser.",
            },
            designer: {
                title: "Diseñador",
                description:
                    "Base sólida en diseño de videojuegos, con especial interés en mecánicas, diseño de niveles y procesos de iteración mediante playtesting.",
            },
            producer: {
                title: "Productor",
                description:
                    "He liderado pequeños equipos universitarios (3-8 personas), organizando alcance, prioridades y decisiones alrededor de una visión clara.",
            },
        },
        education: {
            ddvja: {
                title: "DDVJA — Grado en Diseño y Desarrollo de Videojuegos",
                institution: "ENTI-UB (Barcelona)",
                period: "2023 — Actualidad",
                description:
                    "Estudiante de desarrollo de videojuegos en tercer curso, centrado en gameplay, diseño, producción y prototipado rápido en varios motores.",
            },
            damviod: {
                title: "DAM-VIOD — Desarrollo de Aplicaciones Multiplataforma",
                institution: "ENTI-UB (Barcelona)",
                period: "2021 — 2023",
                description:
                    "Grado superior centrado en desarrollo de aplicaciones, bases de datos e ingeniería de software, con especialización en desarrollo de videojuegos.",
            },
            bachillerato: {
                title: "Bachillerato Tecnológico",
                institution: "INS Leonardo da Vinci (Sant Cugat del Vallès)",
                period: "2019 — 2021",
                description:
                    "Bachillerato orientado a tecnología con bases en matemáticas, física y exposición temprana a la programación.",
            },
        },
        skills: {
            csharp: { description: "Lenguaje principal para desarrollo de juegos en Unity" },
            cpp: { description: "Usado en Unreal Engine y sistemas de bajo nivel" },
            javascript: { description: "Desarrollo de juegos web con Phaser" },
            processing: {
                description: "Código creativo para prototipos y experimentos universitarios",
            },
            html5: { description: "Estructura para proyectos web" },
            css3: { description: "Estilos y diseño visual para la web" },
            unity: { description: "Motor 2D/3D, mi herramienta principal" },
            unreal: { description: "Motor de calidad AAA para proyectos de alta fidelidad" },
            phaser: { description: "Framework HTML5 para juegos en navegador" },
            blender: { description: "Modelado 3D, animación y render" },
            photoshop: { description: "Edición de imágenes y creación de texturas" },
            aseprite: { description: "Herramienta de pixel art y animación de sprites" },
            git: { description: "Control de versiones para todos los proyectos" },
            github: { description: "Hosting de código y colaboración" },
            gitlab: { description: "CI/CD y gestión de proyectos" },
            jira: { description: "Gestión ágil de proyectos y seguimiento de tareas" },
            audacity: { description: "Edición y limpieza básica de audio" },
            visualstudio: { description: "IDE para desarrollo en C# y C++" },
        },
        qa: {
            games: {
                question: "¿Qué tipo de juegos te interesan más?",
                answer:
                    "Me atraen las experiencias de supervivencia y mundo abierto. Mis sagas favoritas incluyen Fallout, Metro, BioShock, Destiny y The Legend of Zelda, así que disfruto de la exploración, los sistemas y una atmósfera potente.",
            },
            internships: {
                question: "¿Estás abierto a prácticas o colaboraciones?",
                answer:
                    "No busco trabajo a tiempo completo todavía, pero estoy abierto a mensajes y colaboraciones. También estaré buscando prácticas universitarias externas pronto.",
            },
            role: {
                question: "¿Qué rol sueles tomar en un equipo?",
                answer:
                    "Programador de gameplay primero, con aporte de diseño de juego. También he liderado pequeños equipos universitarios (3-8 personas) como productor, ayudando a mantener claro el alcance y las prioridades.",
            },
            prototyping: {
                question: "¿Cómo enfocas el prototipado y la iteración?",
                answer:
                    "Me gusta crear un prototipo pequeño y jugable pronto, luego hacer playtests e iterar según el feedback. El diseño de niveles y el flujo del jugador son áreas que sigo refinando.",
            },
            teamwork: {
                question: "¿Cómo trabajas con equipos?",
                answer:
                    "Soy tranquilo e introvertido, así que escucho primero y luego doy feedback honesto. Me siento cómodo trabajando en grupo y valoro la comunicación clara y las decisiones compartidas.",
            },
            tools: {
                question: "¿Qué herramientas disfrutas usar?",
                answer:
                    "Unity, Unreal Engine y Phaser son mis motores principales. Programo en C# y C++, y también uso Processing para código creativo y Audacity para ediciones rápidas de audio.",
            },
        },
        contactSummary: {
            title: "Ponte en contacto",
            body:
                "Todavía no busco trabajo a tiempo completo, pero estoy abierto a mensajes, colaboraciones y próximas prácticas universitarias.",
        },
        projects: {
            title: "Proyectos",
            filter: { all: "Todos" },
            empty: "No se encontraron proyectos para este motor.",
            view: "Ver proyecto",
        },
        contact: {
            title: "Contacto",
            email: {
                title: "Correo",
                copyTitle: "Copiar correo",
                copySuccess: "✓ ¡Copiado al portapapeles!",
                copyError: "No se pudo copiar. Selecciona el correo manualmente.",
            },
            professional: { title: "Profesional" },
            social: { title: "Redes sociales" },
            direct: { title: "Mensaje directo" },
            form: {
                subject: "Nuevo mensaje desde el portfolio",
                fromName: "Formulario de contacto del portfolio",
                name: { label: "Nombre", placeholder: "Tu nombre" },
                email: { label: "Correo", placeholder: "tu@email.com" },
                message: { label: "Mensaje", placeholder: "Escribe tu mensaje..." },
                submit: "Enviar mensaje",
                sending: "Enviando...",
                success: "✓ ¡Mensaje enviado! Te responderé pronto.",
                error: "Algo salió mal. Prueba otra vez o escribe directamente.",
                networkError: "Error de red. Inténtalo más tarde.",
            },
        },
        footer: {
            nav: "Navegación",
            social: "Redes",
            contact: "Contacto",
            copyTitle: "Haz clic para copiar el correo",
            copySuccess: "✓ ¡Copiado!",
            copyError: "No se pudo copiar",
            copyright: "Todos los derechos reservados.",
        },
        notFound: {
            title: "Página no encontrada",
            body: "La página que buscas no existe o se ha movido.",
            back: "← Volver al inicio",
        },
    },
};