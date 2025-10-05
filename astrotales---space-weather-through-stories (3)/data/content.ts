// Fix: Add CrosswordData to the import to support the new crosswordGames data.
import { Story, QuizQuestion, PictureIdentifyQuestion, ExploreMedia, PuzzleInfo, CrosswordData, SolarThreat } from '../types';

export const storyData: Story[] = [
    {
        id: 'astronaut-leeva-1',
        character: 'Astronaut',
        title: 'Astronaut Leeva and the Solar Cloud',
        slides: [
            { image: '/videos/Astronaut-1.png', videoUrl: '/videos/astronaut_1.mp4', text: 'Astronaut Leeva floated high above Earth. She checked her instruments every day. "My tools help me stay safe," she said. The Earth below looked calm and blue.' },
            { image: '/videos/astronaut-2-3.png', videoUrl: '/videos/Astronaut_2_3.mp4', text: 'Far away, the Sun sent a giant cloud of energy. It is called a Coronal Mass Ejection (CME). The cloud raced through space toward Leeva\'s station.' },
            { image: '/videos/astronaut-2-3.png', videoUrl: '/videos/Astronaut_2_3.mp4', text: 'A CME is a bubble of solar energy and particles. It can make computers blink and instruments act funny. Satellites and space stations can wobble too.' },
            { image: '/videos/astronaut-4.png', videoUrl: '/videos/astronaut_4.mp4', text: 'Suddenly, Leeva’s instruments flickered. Some numbers were wrong and blinking fast. “Oh no! I can’t trust my computers,” she thought. The solar cloud was causing trouble!' },
            { image: '/videos/astronaut-5.png', videoUrl: '/videos/astronaut_5.mp4', text: 'Leeva turned on protective shields around her instruments. She also used backup manual tools to control the station. These tools worked even without electricity.' },
            { image: '/videos/astronaut-6.png', videoUrl: '/videos/astronaut_6_7.mp4', text: 'Leeva carefully used her backup tools. She waited for the solar cloud to pass. Slowly, she adjusted the station and kept everything safe.' },
            { image: '/videos/astronaut-7.png', videoUrl: '/videos/astronaut_6_7.mp4', text: 'After the CME passed, all instruments worked perfectly. The space station floated safely again. Leeva smiled with relief and pride. Her shields and smart thinking had saved the day!' },
        ],
        funFact: { image: '/videos/CME.jpg', text: 'A giant cloud of energy from the Sun, called a Coronal Mass Ejection (CME), is a massive burst of solar plasma and magnetic field that can travel through space toward Earth.' }
    },
    {
        id: 'farmer-ravi-1',
        character: 'Farmer',
        title: 'Ravi and the Sky Storm',
        slides: [
            { image: '/videos/farmer-1.png', videoUrl: '/videos/Farmer_1.mp4', text: 'Ravi was a happy farmer. Every morning, he looked at his little helpers—small gadgets in the soil that told him if the plants needed water.' },
            { image: '/videos/farmer-2-3.png', videoUrl: '/videos/Farmer_2_3.mp4', text: 'Far away, the Sun was very busy. Suddenly, it sent a big burst of light and tiny sparks toward Earth. It didn\'t mean to hurt anyone, but it was very strong.' },
            { image: '/videos/farmer-2-3.png', videoUrl: '/videos/Farmer_2_3.mp4', text: 'The Sun\'s bursts are called space weather. It can reach Earth and sometimes make machines, satellites, and gadgets behave strangely—even Ravi\'s soil helpers!' },
            { image: '/videos/farmer-4.png', videoUrl: '/videos/Farmer_4.mp4', text: 'Next morning, Ravi saw his gadgets blinking strangely. "Oh no! How will I know if the plants need water?" he worried. If he guessed wrong, the plants might get too dry or too wet.' },
            { image: '/videos/farmer-5.png', videoUrl: '/videos/Farmer_5.mp4', text: 'Ravi remembered a tool he had: a space weather app. It got signals from satellites and warned farmers before storms from the Sun arrived. "Solar storm coming! Gadgets may not work properly."' },
            { image: '/videos/farmer-6.png', videoUrl: '/videos/Farmer_6_7.mp4', text: 'Ravi used a simple stick and bucket to check the soil. He didn’t only rely on the gadgets. He also waited for the solar storm to pass and watered the plants carefully.' },
            { image: '/videos/farmer-7.png', videoUrl: '/videos/Farmer_6_7.mp4', text: 'After the storm, Ravi\'s gadgets worked again. The plants were happy and healthy. Ravi learned that smart thinking, simple tools, and technology together can solve big problems.' },
        ],
        funFact: { image: '/videos/Space_weather.jpg', text: 'A solar storm is a burst of charged particles and radiation from the Sun that can affect satellites, communications, and power systems on Earth.' }
    },
    {
        id: 'pilot-ashay-1',
        character: 'Pilot',
        title: 'Pilot Ashay: Radio Blackouts in the Sky',
        slides: [
            { image: '/videos/Pilot-1.png', videoUrl: '/videos/pilot_1.mp4', text: 'Ashay loves to fly her fast airplane high in the sky. He always talks to Air Traffic Control (ATC) on his radio to ensure his flies safely.' },
            { image: '/videos/Pilot-2.png', videoUrl: '/videos/Pilot_2.mp4', text: 'One sunny afternoon, Ashay was flying over a big ocean. Suddenly, his radio started making strange noises: "ZZZZZT... crackle... ZZZZT!" He couldn\'t hear ATC anymore.' },
            { image: '/videos/Pilot-3.png', videoUrl: '/videos/Pilot_3.mp4', text: 'What happened? Sometimes, the Sun sends out extra energy that hits Earth\'s upper air, called the ionosphere. This makes it hard for radio waves to travel through.' },
            { image: '/videos/Pilot-4.png', videoUrl: '/videos/Pilot_4.mp4', text: 'Ashay knew this could happen. He quickly checked his other screens. His GPS was still working! He also knew his plane\'s path and how to fly safely for a while without talking.' },
            { image: '/videos/Pilot-5.png', videoUrl: '/videos/Pilot_5.mp4', text: 'After a little while, the Sun\'s trick faded. The ionosphere settled down, and Ashay\'s radio became clear again! "Welcome back, Ashay!" cheered ATC.' },
            { image: '/videos/Pilot-6.png', videoUrl: '/videos/Pilot_6.mp4', text: 'Ashay teaches us that it\'s important to stay calm and know your plan. Always be ready, just like Ashay, and you can handle any surprise!' },
        ],
        funFact: { image: '/videos/Ionosphere.png', text: 'The ionosphere helps make the Northern and Southern Lights glow in the sky.' }
    },
    {
        id: 'engineer-sam-1',
        character: 'Engineer',
        title: 'Engineer Sam and the Dancing Sky',
        slides: [
            { image: '/videos/engineer-1.png', videoUrl: '/videos/engineer1.mp4', text: 'Engineer Sam was walking home after work. The city lights glowed bright. Suddenly, green and red lights appeared in the sky! They swirled and danced like ribbons.' },
            { image: '/videos/engineer-2.png', videoUrl: '/videos/engineer_2.mp4', text: '"Wow! Northern Lights here, in my city?" Sam gasped. This was a geomagnetic storm, a type of space weather. It made the sky light up in colors.' },
            { image: '/videos/engineer-3.png', videoUrl: '/videos/engineer_3.mp4', text: 'But it could also cause hidden problems. Sam\'s phone lost signal. Some streetlights flickered. "Beautiful lights... but dangerous power too," Sam thought.' },
            { image: '/videos/engineer-4.png', videoUrl: '/videos/engineer_4.mp4', text: 'Sam didn\'t panic—he explained to his neighbors. "These lights are called auroras. They are pretty, but they mean our power could break. We must save energy tonight, just in case."' },
            { image: '/videos/engineer-5.png', videoUrl: '/videos/engineer_5.mp4', text: 'Families turned off extra lights and gadgets. Shops used backup batteries. Sam checked the power stations for safety.' },
            { image: '/videos/engineer-6-7.png', videoUrl: '/videos/engineer_7.mp4', text: 'The storm passed, and the city stayed safe. People remembered the magical glow. Sam smiled, glad everyone had worked together to turn fear into teamwork.' },
        ],
        funFact: { image: '/videos/Aurora1.jpg', text: 'Auroras can shine in green, purple, pink, and even red!' }
    },
    {
        id: 'kid-Sid-1',
        character: 'Kid',
        title: 'Sid and the Lost Signal',
        slides: [
            { image: '/videos/kid-1.png', videoUrl: '/videos/kid_1.mp4', text: 'Sid sat happily in front of the TV. He waited for his favorite cartoon to start. "Best part of the day!" he said.' },
            { image: '/videos/kid-2.png', videoUrl: '/videos/kid_2.mp4', text: 'The Sun sent a wave of charged particles. It was a solar storm, part of space weather. The storm raced toward Earth. It was invisible but powerful.' },
            { image: '/videos/kid-3.png', videoUrl: '/videos/kid_3.mp4', text: 'A solar storm can disturb satellites in space. Satellites send signals for TV, GPS, and phones. When the storm hits, signals may break and screens can go blank!' },
            { image: '/videos/kid-4.png', videoUrl: '/videos/kid_4.mp4', text: 'Suddenly, Sid\'s TV screen turned black. "No cartoons?" he cried. The storm had blocked the satellite. He felt confused and upset.' },
            { image: '/videos/kid-5.png', videoUrl: '/videos/kid_5.mp4', text: 'At school the next day, his teacher smiled. "Don\'t worry, Sid. That was space weather. The Sun sometimes plays tricks with satellites."' },
            { image: '/videos/kid-6.png', videoUrl: '/videos/kid_6.mp4', text: 'Sid told his friends about the storm. "It wasn’t magic, it was the Sun!" he said. They laughed and felt less scared. Learning turned worry into wonder.' },
        ],
        funFact: { image: '/videos/Solar_storm.jpg', text: 'Solar storms start 150 million km away on the Sun but can still reach Earth in just a few hours!' }
    }
];

export const quizQuestions: QuizQuestion[] = [
    { question: 'What is the main source of energy for stars like the Sun?', options: ['Burning coal', 'Nuclear fusion', 'Electricity', 'Magnetism'], correctAnswer: 'Nuclear fusion' },
    { question: 'What are giant clouds of gas and dust in space where stars are born called?', options: ['Nebulae', 'Asteroids', 'Comets', 'Black holes'], correctAnswer: 'Nebulae' },
    { question: 'What is the final stage of a massive star\'s life called?', options: ['Nebula', 'Black Hole', 'White Dwarf', 'Comet'], correctAnswer: 'Black Hole' },
    { question: 'What type of star is the Sun?', options: ['Red Giant', 'Yellow Dwarf', 'Neutron Star', 'White Dwarf'], correctAnswer: 'Yellow Dwarf' },
    { question: 'What is the name of the bright explosion that happens when a massive star dies?', options: ['Meteor', 'Supernova', 'Comet', 'Aurora'], correctAnswer: 'Supernova' },
    { question: 'Which type of star is the hottest?', options: ['Red', 'Yellow', 'White', 'Blue'], correctAnswer: 'Blue' },
    { question: 'What galaxy do we live in?', options: ['Andromeda', 'Milky Way', 'Whirlpool', 'Sombrero'], correctAnswer: 'Milky Way' },
    { question: 'What do we call a star that suddenly increases greatly in brightness and then fades?', options: ['Comet', 'Nova', 'Meteor', 'Dwarf'], correctAnswer: 'Nova' },
    { question: 'Which star is the closest one to Earth (besides the Sun)?', options: ['Polaris', 'Alpha Centauri', 'Sirius', 'Betelgeuse'], correctAnswer: 'Alpha Centauri' },
    { question: 'What is the name of the North Star?', options: ['Polaris', 'Rigel', 'Vega', 'Proxima'], correctAnswer: 'Polaris' },
    { question: 'Which kind of radiation from the Sun can cause harm to astronauts?', options: ['Gamma Rays', 'Infrared', 'Radio Waves', 'Visible Light'], correctAnswer: 'Gamma Rays' },
    { question: 'What protects us on Earth from harmful solar radiation besides the magnetic field?', options: ['Clouds', 'Atmosphere', 'Water', 'Stars'], correctAnswer: 'Atmosphere' },
    { question: 'What happens to satellites during strong solar storms?', options: ['They fall faster', 'They can stop working', 'They get brighter', 'They turn into stars'], correctAnswer: 'They can stop working' },
    { question: 'Which star is known as the brightest in our night sky?', options: ['Vega', 'Sirius', 'Rigel', 'Deneb'], correctAnswer: 'Sirius' },
    { question: 'What is the study of stars and planets called?', options: ['Astronomy', 'Astrology', 'Geology', 'Meteorology'], correctAnswer: 'Astronomy' },
    { question: 'What is the life span of a typical star like the Sun?', options: ['A few thousand years', 'Billions of years', 'Millions of years', 'Hundreds of years'], correctAnswer: 'Billions of years' },
    { question: 'What type of star remains after a small star runs out of fuel?', options: ['Neutron Star', 'White Dwarf', 'Black Hole', 'Red Giant'], correctAnswer: 'White Dwarf' },
    { question: 'What is the glowing outer atmosphere of a star called?', options: ['Corona', 'Photosphere', 'Mantle', 'Core'], correctAnswer: 'Corona' },
    { question: 'What is the term for the twinkling of stars caused by Earth\'s atmosphere?', options: ['Reflection', 'Scintillation', 'Refraction', 'Rotation'], correctAnswer: 'Scintillation' },
    { question: 'What is the color of the coolest stars?', options: ['Red', 'Yellow', 'Blue', 'White'], correctAnswer: 'Red' },
    { question: 'What is a group of stars forming a recognizable pattern called?', options: ['Galaxy', 'Constellation', 'Meteor Shower', 'Orbit'], correctAnswer: 'Constellation' },
    { question: 'Which constellation is known as "The Hunter"?', options: ['Ursa Major', 'Orion', 'Draco', 'Lyra'], correctAnswer: 'Orion' },
    { question: 'What is the explosion on the Sun\'s surface that releases large amounts of energy called (different from a flare)?', options: ['Coronal Mass Ejection (CME)', 'Blackout', 'Meteor Storm', 'Pulsar'], correctAnswer: 'Coronal Mass Ejection (CME)' },
    { question: 'What is the faint band of light across the night sky caused by billions of stars called?', options: ['Aurora', 'Milky Way', 'Shooting Star', 'Star Trail'], correctAnswer: 'Milky Way' },
    { question: 'What star will the Sun become at the end of its life cycle?', options: ['Neutron Star', 'White Dwarf', 'Black Hole', 'Supernova'], correctAnswer: 'White Dwarf' },
];

export const puzzleImages: PuzzleInfo[] = [
    { id: 'spacepuzzle', name: 'Space Ship', url: '/Game/Sapceship.jpg'},
    { id: 'galaxy', name: 'Planet', url: '/Game/Saturn.jpg'},
    { id: 'nebula', name: 'Space Cloud', url: '/Game/Space_cloud.jpg'},
];

// Fix: Export crosswordGames data to resolve import error in GamesScreen.
export const crosswordGames: CrosswordData[] = [
    {
        id: 'astro1',
        name: 'Astro Crossword 1',
        size: 7,
        entries: [
            { clue: 'Planet with famous rings', answer: 'SATURN', direction: 'across', row: 0, col: 1 },
            { clue: 'Our galaxy\'s name', answer: 'MILKY', direction: 'across', row: 2, col: 2 },
            { clue: 'A shooting star', answer: 'METEOR', direction: 'across', row: 4, col: 0 },
            { clue: 'The \'Red Planet\'', answer: 'MARS', direction: 'across', row: 6, col: 0 },
            { clue: 'Our star', answer: 'SUN', direction: 'down', row: 0, col: 1 },
            { clue: 'Path of a planet around the sun', answer: 'ORBIT', direction: 'down', row: 0, col: 5 },
            { clue: 'A pattern of stars, like the Little Bear (__ Minor)', answer: 'URSA', direction: 'down', row: 2, col: 4 },
            { clue: 'Twinkling object in the night sky', answer: 'STAR', direction: 'down', row: 3, col: 2 },
        ],
    },
    {
        id: 'astro2',
        name: 'Planetary Puzzler',
        size: 8,
        entries: [
            { clue: 'Largest planet', answer: 'JUPITER', direction: 'across', row: 1, col: 1 },
            { clue: 'Earth\'s natural satellite', answer: 'MOON', direction: 'across', row: 3, col: 0 },
            { clue: 'Dwarf planet', answer: 'PLUTO', direction: 'across', row: 5, col: 3 },
            { clue: 'Force that keeps planets in orbit', answer: 'GRAVITY', direction: 'across', row: 7, col: 0 },
            { clue: 'Gas giant with prominent rings', answer: 'SATURN', direction: 'down', row: 0, col: 6 },
            { clue: 'Planet known for its Great Red Spot', answer: 'JUPITER', direction: 'down', row: 1, col: 1 },
            { clue: 'Rocky body orbiting the sun', answer: 'ASTEROID', direction: 'down', row: 0, col: 3 },
            { clue: 'The color of Neptune', answer: 'BLUE', direction: 'down', row: 4, col: 5 },
        ],
    },
    {
        id: 'astro3',
        name: 'Tech & Phenomena',
        size: 10,
        entries: [
            { clue: 'Famous space telescope', answer: 'HUBBLE', direction: 'across', row: 0, col: 3 },
            { clue: 'Vehicle for space travel', answer: 'SPACESHIP', direction: 'across', row: 2, col: 1 },
            { clue: 'A massive explosion of a star', answer: 'SUPERNOVA', direction: 'across', row: 5, col: 0 },
            { clue: 'Its gravity is inescapable', answer: 'BLACKHOLE', direction: 'across', row: 9, col: 1 },
            { clue: 'US Space Agency', answer: 'NASA', direction: 'down', row: 4, col: 8 },
            { clue: 'A cloud of gas and dust in space', answer: 'NEBULA', direction: 'down', row: 0, col: 5 },
            { clue: 'Beautiful polar light display', answer: 'AURORA', direction: 'down', row: 1, col: 3 },
            { clue: 'A celestial body orbiting a star', answer: 'PLANET', direction: 'down', row: 2, col: 1 },
        ],
    }
];

export const pictureIdentifyData: PictureIdentifyQuestion[] = [
    { image: '/videos/Space_weather.jpg', options: ['Nebula', 'Solar Flare', 'Galaxy', 'Comet'], correctAnswer: 'Solar Flare' },
    { image: '/videos/Sun_spot.jpg', options: ['Sunspot', 'Crater', 'Volcano', 'Black Hole'], correctAnswer: 'Sunspot' },
    { image: '/videos/aurora.jpg', options: ['Rainbow', 'Aurora', 'Sunset', 'Mirage'], correctAnswer: 'Aurora' },
    { image: '/videos/HaloCME.jpg', options: ['Galaxy', 'Coronal Mass Ejection', 'Black Hole', 'Supernova'], correctAnswer: 'Coronal Mass Ejection' },
    { image: '/videos/ISS.jpg', options: ['Hubble Telescope', 'Satellite', 'International Space Station', 'Moon Base'], correctAnswer: 'International Space Station' },
    { image: '/videos/milky.jpg', options: ['Andromeda', 'A Nebula', 'The Milky Way', 'A Comet Tail'], correctAnswer: 'The Milky Way' },
];

export const exploreData: ExploreMedia[] = [
    { id: 1, type: 'image', url: '/Explore/nebula.jpg', title: 'Stunning Nebula' },
    { id: 2, type: 'video', url: '/Explore/20190530-SPITZRf-0001-Stars of Cephus~small.mp4', title: 'Stars' },
    { id: 3, type: 'image', url: '/Explore/neptune.jpg', title: 'The Dark Blue Planet' },
    { id: 4, type: 'image', url: '/Explore/earth img.jpg', title: 'Earth from Space' },
    { id: 5, type: 'video', url: '/Explore/GSFC_20110617_LRO_m10794_Eclipse_Librating_Moon~small.mp4', title: 'Beauty of Moon' },
    { id: 6, type: 'image', url: '/Explore/Hi_astro.jpg', title: 'Astronaut Spacewalk' },
    { id: 7, type: 'video', url: '/Explore/GSFC_20171107_Ionosphere_m12532_ICON~small.mp4', title: 'Animated Ionosphere' },
    { id: 8, type: 'video', url: '/Explore/GSFC_20130314_Jupiter_m11204_HotSpots~small.mp4', title: 'Jupiter Hotspot' },
    { id: 9, type: 'video', url: '/Explore/GSFC_20141112_MAVEN_m10196_Statistics~small.mp4', title: 'Hot Mar' },
    { id: 10, type: 'image', url: '/Explore/mercury.jpg', title: 'silvery Mercury' },
    { id: 11, type: 'video', url: '/Explore/GSFC_20160426_SDO_m12224_SolarFlare~small.mp4', title: 'Solar Flares' },
    { id: 12, type: 'video', url: '/Explore/GSFC_20160815_Radiation_m12328_Belts~small.mp4', title: 'Radiation Belt' },
    { id: 13, type: 'image', url: '/Explore/uranus.jpg', title: 'Blue Beauty' },
    { id: 14, type: 'image', url: '/Explore/aurora.jpg', title: 'Nature lights' },
    { id: 15, type: 'video', url: '/Explore/GSFC_20181217_Saturn_m12672_Rings~small.mp4', title: 'Saturn Rings' },
    { id: 16, type: 'video', url: '/Explore/GSFC_20170419_EarthFleet_m12586_2017~small.mp4', title: 'Home Planet' },
    { id: 17, type: 'video', url: '/Explore/GSFC_20170330_Rossby_m12550_Waves~small.mp4', title: 'Rossby Waves' },
];

export const solarThreatData: SolarThreat[] = [
    { id: 'cme', name: 'CME', iconUrl: '/Explore/CME.jpg', speed: 8, info: 'Coronal Mass Ejections are huge bubbles of gas from the Sun.' },
    { id: 'flare', name: 'Solar Flare', iconUrl: '/Explore/Solar_flares.jpg', speed: 5, info: 'Solar Flares are intense bursts of radiation.' },
    { id: 'wind', name: 'Solar Wind', iconUrl: '/Explore/Solar_wind.png', speed: 10, info: 'Solar Wind is a stream of charged particles from the Sun.' },
];