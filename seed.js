
const { Artwork, Artist, ShopImage, Genre, User, Order, OrderItem, syncDB } = require('./server/db');
const bcrypt = require('bcrypt');


const artworkData = [[`A Bigger Splash`,`Painted in California between April and June 1967, and measuring 242.5 centimetres (95.5 in) by 243.9 centimetres (96.0 in), this painting depicts a swimming pool beside a modern house, disturbed by a large splash of water created by an unseen figure who has apparently just jumped in from a diving board.`,1967,`Graphic Art`,29.99,7],
[`Unique Forms of Continuity in Space`,`Unique Forms of Continuity in Space (Italian: Forme uniche della continuità nello spazio) is a 1913 bronze Futurist sculpture by Umberto Boccioni. It is seen as an expression of movement and fluidity. The sculpture is depicted on the obverse of the Italian-issue 20 cent euro coin.`,1913,`Sculpture`,74.99,3],
[`Memory, the Heart`,`Memory, the Heart, a 1937 painting by Frida Kahlo, depicts the pain and anguish Kahlo experienced during and after an affair between her husband, artist Diego Rivera, and her sister, Cristina Kahlo.`,1937,`Graphic Art`,89.99,7],
[`The Wounded Deer`,`The Wounded Deer, Kahlo shares her enduring physical and emotional suffering with her audience, as she did throughout her creative oeuvre. `,1946,`Graphic Art`,64.99,11],
[`Untitled (Black on Grey`,`Untitled (Black on Grey) is an acrylic on canvas painting by Mark Rothko. It is a painting of a black rectangle and a grey rectangle.`,1970,`Graphic Art`,51.99,4],
[`Black in Deep Red`,`Black in Deep Red is a painting by Mark Rothko from 1957. It is now in private collection after it was sold in 2000 for $3,306,000.`,1957,`Graphic Art`,3.99,16],
[`Hard Scrabble Sky`,`UIC Skyspace is a skyspace by James Turrell located at the southwest corner of Roosevelt Road and Halsted Street in Chicago. `,2005,`Installation`,44.99,1],
[`Ascension of Polka Dots on the Trees`,`Ascension of Polka Dots on the Trees was displayed at the Singapore Biennale 2006 on Orchard Road, Singapore.`,2006,`Installation`,49.99,4],
[`Yellow Pumpkin`,`Following the success of the Japanese pavilion at the Venice Biennale in 1993, a dazzling mirrored room filled with small pumpkin sculptures in which she resided in color-coordinated magician's attire, Kusama went on to produce a huge, yellow pumpkin sculpture covered with an optical pattern of black spots.`,1993,`Sculpture`,16.99,46],
[`Untitled`,`Anodized color on extruded aluminum, 5⅞ x 41⅜ x 5⅞ inches.`,1991,`Sculpture`,4.99,15],
[`Mona Lisa`,`The Mona Lisa or La Gioconda is a half-length portrait painting by the Italian artist Leonardo da Vinci. It is considered an archetypal masterpiece of the Italian Renaissance, and has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world". The painting's novel qualities include the subject's expression, which is frequently described as enigmatic, the monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism.`,1506,`Graphic Art`,99.99,30],
[`The Artist Is Present`,`A 736-hour and 30-minute static, silent piece, in which the artist sat immobile in the museum's atrium while spectators were invited to take turns sitting opposite her. `,2010,`Performance Art`,25,736],
[`Self Portrait`,`Van Gogh's dozens of self-portraits were an important part of his oeuvre as a painter. Most probably, van Gogh's self-portraits are depicting the face as it appeared in the mirror he used to reproduce his face, i.e. his right side in the image is in reality the left side of his face.`,1887,`Graphic Art`,23,32],
[`Sunflowers`,`Sunflowers (original title, in French: Tournesols) is the name of two series of still life paintings by the Dutch painter Vincent van Gogh. The first series, executed in Paris in 1887, depicts the flowers lying on the ground, while the second set, made a year later in Arles, shows a bouquet of sunflowers in a vase.`,1888,`Graphic Art`,47,25],
[`The Treachery of Images`,`The Treachery of Images is a 1929 painting by surrealist painter René Magritte. Magritte painted it when he was 30 years old. It is on display at the Los Angeles County Museum of Art. The painting shows an image of a pipe. Below it, Magritte painted, "Ceci n'est pas une pipe", French for "This is not a pipe".`,1929,`Graphic Art`,0.99,36],
[`Red Canna`,`Georgia O'Keeffe made a number of Red Canna paintings of the canna lily plant, first in watercolor, such as a red canna flower bouquet painted in 1915, but primarily abstract paintings of close-up images in oil. O'Keeffe said that she made the paintings to reflect the way she herself saw flowers, although others have called her depictions erotic, and compared them to female genitalia.`,1924,`Graphic Art`,45.95,78],
[`Woman with a Parasol`,`Woman with a Parasol - Madame Monet and Her Son, sometimes known as The Stroll, is an oil-on-canvas painting by Claude Monet from 1875. The Impressionist work depicts his wife Camille Monet and their son Jean Monet in the period from 1871 to 1877 while they were living in Argenteuil, capturing a moment on a stroll on a windy summer's day.`,1875,`Graphic Art`,67.8,60],
[`Toyama Persian Ceiling`,`Persians are dynamic, asymmetrical forms that take on a dramatic new presence when placed together in pedestal compositions and ceiling installations, called Pergolas. Bursting with color, these unexpected installations invite people to interact with art in a new way.`,2015,`Installation`,400,50],
[`The Three Musicians`,`The Three Musicians is an oil painting by Diego Velázquez, a Spanish Baroque painter considered one of the great Spanish naturalists. It depicts three young men grouped around a dinner table playing music. It is painted in chiaroscuro, a Baroque painting technique that made use of the contrast between light and dark shadows to achieve a sense of volume.`,1618,`Graphic Art`,89.99,40],
[`Little Dancer of Fourteen Years`,`The Little Fourteen-Year-Old Dancer is a sculpture begun c. 1880 by Edgar Degas of a young student of the Paris Opera Ballet dance school, a Belgian named Marie van Goethem. The sculpture is one-third life size and was originally sculpted in wax, a somewhat unusual choice of medium for the time. It is dressed in a real bodice, tutu and ballet slippers and has a wig of real hair.`,1880,`Sculpture`,59.99,50],
[`Leeches`,`Encoding a series of words and symbols, Basquiat represents elements of his cultural heritage as a social commentary on racial segregation and alienation. The loosely defined and abstracted image reflect a fragmented and torn individual.`,1983,`Graphic Art`,297.97,9],
[`Children's Games (Kinderspiele )`,`The artist's intention for this work is more serious than simply to compile an illustrated encyclopedia of children's games, though some eighty particular games have been identified. Bruegel shows the children absorbed in their games with the seriousness displayed by adults in their apparently more important pursuits. His moral is that in the mind of God children's games possess as much significance as the activities of their parents.`,1560,`Graphic Art`,23.99,87],
[`Guernica`,`Guernica was Picasso's response to the bombing of the Basque town of the same name on April 26, 1937 during the Spanish Civil War. Picasso was commissioned by the republican government of Spain to produce a mural painting for the Spanish Pavilion at the World Fair in Paris.`,1937,`Graphic Art`,82.02,4],
[`Bird on Money`,`Bird on Money is an abstract painting in the Neo-Expressionism style and pays tribute to jazz musician Charlie Parker, who Basquiat idolised. The loosely arranged complexity of this picture shows a chicken or yard-bird, a nickname by which Parker was known. The spontaneous disarray of shapes and symbols seem to mimic the improvised jazz compositions of Charlie Parker's playing style. `,1981,`Graphic Art`,109.89,5],
[`Presence`,`Oil, acrylic, mixed media on wood panel, 48" x 60"`,2018,`Graphic Art`,98.97,3],
[`St. Francis of Adelaide`,`Cast marble dust and resin; 12 x 10 x 5.5 in. (30.48 x 25.4 x 13.97 cm.) `,2006,`Sculpture`,45.99,32],
[`Vignette 13`,`Part of a series, The large paintings were executed originally in a grisaille palette and featured themes of love and romance as in the genre of the Baroque and Rococo. As the series continued on, the Vignettes were painted in full color for our gallery exhibition in 2008.`,2008,`Graphic Art`,78.49,19],
[`Les Demoiselles D'Avignon`,`Les Demoiselles d’Avignon marks a radical break from traditional composition and perspective in painting. It depicts five naked women composed of flat, splintered planes whose faces were inspired by Iberian sculpture and African masks. `,1907,`Graphic Art`,29.99,21],
[`Dance at Moulin de la Galette`,`Dance at Moulin de la Galette is one of Impressionism’s most highly revered masterpieces. The scene is of a Sunday afternoon at Moulin de la Galette, where Parisians would typically dress up and spend all day dancing, drinking,and eating galettes, or flat cakes.`,1876,`Graphic Art`,89,5],
[`The Persistence of Memory`,`The Persistence of Memory (1931) is one of the most iconic and recognizable paintings of Surrealism. Frequently referenced in popular culture, the small canvas (24x33 cm) is sometimesknown as “Melting Clocks”, “The Soft Watches” and “The Melting Watches”. The painting depictsa dreamworld in which common objects are deformed and displayed in a bizarre and irrational waywatches, solid and hard objects appear to be inexplicably limp and melting in the desolate landscape.`,1931,`Graphic Art`,99,3],
[`The Anatomy Lesson of Dr. Nicolaes Tulp`,`The Anatomy Lesson of Dr. Nicolaes Tulp is a 1632 oil painting on canvas by Rembrandt housed in the Mauritshuis museum in The Hague, the Netherlands. The painting is regarded as one of Rembrandt's early masterpieces.`,1632,`Graphic Art`,79,5],
[`The City`,`The City or La Ville in French is a 1919 painting by Fernand Leger. In The City, Leger successful captured the disjointed rhythms of contemporary urban space and the extensive vista of its skyscrapers, bridges, and scaffolding.`,1919,`Graphic Art`,95,4],
[`The Night Cafe`,`Night Café by Van Gogh was painted in September 1888 while he was living in Arles. Earlier in the year he had moved to a room at the Café de la Gare, where the room depicted in this painting was. Van Gogh stayed there for a few months over the summer while he furnished what would become known as “The Yellow House”, where he would famously live with Gauguin for a brief time.`,1888,`Graphic Art`,229,5],
[`The Storm on the Sea of Galilee`,`The Storm on the Sea of Galilee is the only seascape ever painted by Rembrandt. It depicts Jesus calming the waves of the sea, saving the lives of the fourteen men aboard the vessel. Of these fourteen men, it is said Rembrandt included a self portrait of himself in the boat, next to Jesus and his twelve disciples`,1633,`Graphic Art`,149,2],
[`Number 5`,`No. 5, 1948 is a painting by Jackson Pollock, an American painter known for his contributions to the abstract expressionist movement. It was sold in 22 May 2006 for $140 million, a new mark for highest ever price for a painting, not surpassed until April 2011.`,1948,`Graphic Art`,220,4],
[`Composition VIII`,`Composition VIII, produced in 1923 by Russian artist Wassily Kandinsky, is an oil-on-canvas painting created in the Abstract style. The painting consists of a variety of geometric shapes, colours, straight and curved lines set against a background of cream that melds at certain points into areas of pale blue`,1923,`Graphic Art`,311,1],
[`The Hay Wain`,`The Hay Wain is a painting by John Constable, finished in 1821, which depicts a rural scene on the River Stour between the English counties of Suffolk and Essex. It hangs in the National Gallery in London and is regarded as "Constable's most famous image" and one of the greatest and most popular English paintings.`,1821,`Graphic Art`,185,3],
[`The Starry Night`,`Van Gogh's night sky is a field of roiling energy. Below the exploding stars, the village is a place of quiet order. Connecting earth and sky is the flamelike cypress, a tree traditionally associated with graveyards and mourning.`,1889,`Graphic Art`,100,9],
[`Black Beauty (Tyla)`,`Archival digital print; 29 1/2 × 21 in; 74.9 × 53.3 cm`,2012,`Graphic Art`,85.99,10],
[`A boba`,`The woman sits with her eyes fixed upwards, what gives the painting a movement in this direction. The blacklines used to delineate also highlight her vague expression and her pursed lips reveal a pensive state. In the painting is clear that the overall rendering of shapes tends towards a cubist simplicity, as well as a significant expressionist language.`,1916,`Graphic Art`,42.98,27]]

const artistData = [
  [`David Hockney`,`David Hockney is an English painter, draftsman, printmaker, stage designer, and photographer. As an important contributor to the pop art movement of the 1960s, he is considered one of the most influential British artists of the 20th century`,`British`],
[`Umberto Boccioni`,`Umberto Boccioni was an influential Italian painter and sculptor. He helped shape the revolutionary aesthetic of the Futurism movement as one of its principal figures`,`Italian`],
[`Frida Kahlo`,`Frida Kahlo was a Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.`,`Mexican`],
[`Mark Rothko`,`Mark Rothko was an American painter of Latvian Jewish descent. Rothko did not personally subscribe to any art movement, but he is generally identified as an abstract expressionist.`,`American`],
[`James Turrell`,`James Turrell (born May 6, 1943) is an American artist primarily concerned with Light and Space.`,`American`],
[`Yayoi Kusama`,`Yayoi Kusama is a Japanese contemporary artist who works primarily in sculpture and installation, but is also active in painting, performance, film, fashion, poetry, fiction, and other arts.`,`Japanese`],
[`Donald Judd`,`Donald Clarence Judd was an American artist associated with minimalism (a term he nonetheless stridently disavowed).`,`American`],
[`Leonardo da Vinci`,`Leonardo da Vinci was an Italian polymath of the High Renaissance who is widely considered one of the greatest painters of all time.`,`Italian`],
[`Marina Abramović`,`A pioneer of performance art, Marina Abramović (born Yugoslavia, 1946) began using her own body as the subject, object, and medium of her work in the early 1970s.`,`Serbian`],
[`Vincent van Gogh`,`Vincent Willem van Gogh was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art. In just over a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life. They include landscapes, still lifes, portraits and self-portraits, and are characterised by bold colours and dramatic, impulsive and expressive brushwork that contributed to the foundations of modern art.`,`Dutch`],
[`René Magritte`,`René François Ghislain Magritte was a Belgian surrealist artist. He became well known for creating a number of witty and thought-provoking images. Often depicting ordinary objects in an unusual context, his work is known for challenging observers' preconditioned perceptions of reality.`,`Belgian`],
[`Georgia O'Keeffe`,`Georgia Totto O'Keeffe (November 15, 1887 – March 6, 1986) was an American artist. She was known for her paintings of enlarged flowers, New York skyscrapers, and New Mexico landscapes. O'Keeffe has been recognized as the "Mother of American modernism".`,`American`],
[`Claude Monet`,`Oscar-Claude Monet was a French painter, a founder of French Impressionist painting and the most consistent and prolific practitioner of the movement's philosophy of expressing one's perceptions before nature, especially as applied to plein air landscape painting.`,`French`],
[`Dale Chihuly`,`Dale Chihuly is an American glass sculptor and entrepreneur. His works are considered to possess outstanding artistic merit in the field of blown glass, "moving it into the realm of large-scale sculpture."The technical difficulties of working with glass forms are considerable, yet Chihuly uses it as the primary medium for installations and environmental artwork.`,`American`],
[`Diego Velázquez`,`Diego Rodríguez de Silva y Velázquez was a Spanish painter, the leading artist in the court of King Philip IV and of the Spanish Golden Age. He was an individualistic artist of the contemporary Baroque period. He began to paint in a precise tenebrist style, later developing a freer manner characterized by bold brushwork.`,`Spanish`],
[`Edgar Degas`,`Edgar Degas was a French artist famous for his pastel drawings and oil paintings of ballerinas. Degas also produced bronze sculptures, prints, and drawings. Degas is especially identified with the subject of dance; more than half of his works depict dancers.`,`French`],
[`Jean-Michel Basquiat`,`Basquiat first achieved fame as part of SAMO, an informal graffiti duo who wrote enigmatic epigrams in the cultural hotbed of the Lower East Side of Manhattan during the late 1970s where the hip hop, punk, and street art movements had coalesced. By the 1980s, he was exhibiting his neo-expressionist paintings in galleries and museums internationally. `,`American`],
[`Pierre-Auguste Renoir`,`Pierre-Auguste Renoir[1] French:  25 February 1841 – 3 December 1919), was a French artist who was a leading painter in the development of the Impressionist style. `,`French`],
[`Salvador Dali`,`Salvador Domingo Felipe Jacinto Dalí i Domènech, 1st Marquess of Dalí de Púbol(11 May 1904 – 23 January 1989) was a Spanish surrealist artist renowned for his technical skill, precise draftsmanship and the striking and bizarre images in his work.`,`Spanish`],
[`Pieter Bruegel`,`Bruegel was the most significant artist of Dutch and Flemish Renaissance painting, a painter and printmaker, known for his landscapes and peasant scenes (so-called genre painting); he was a pioneer in making both types of subject the focus in large paintings. `,`Dutch`],
[`Rembrandt`,`Rembrandt Harmenszoon van Rijn (15 July 1606 - 4 October 1669) was a Dutch draughtsman, painter, and printmaker. An innovative and prolific master in three media, he is generally considered one of the greatest visual artists in the history of art and the most important in Dutch art history.`,`Dutch`],
[`Fernand Léger`,`Joseph Fernand Henri Léger (February 4, 1881 – August 17, 1955) was a French painter, sculptor, and filmmaker. In his early works he created a personal form of cubism (known as "tubism") which he gradually modified into a more figurative, populist style. His boldly simplified treatment of modern subject matter has caused him to be regarded as a forerunner of pop art.`,`French`],
[`Pablo Picasso`,`Regarded as one of the most influential artists of the 20th century, Pablo Picasso is known for co-founding the Cubist movement, the invention of constructed sculpture,[6][7] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. `,`Spanish`],
[`Tim Okamura`,`Tim Okamura is a contemporary Canadian artist known for his depiction of subjects who are African-American (and of other people of color) in urban settings, and for his combination of graffiti and realism. His work has been featured in several major motion pictures and in London's National Portrait Gallery. `,`Canadian`],
[`Jackson Pollock`,`Paul Jackson Pollock was an American painter and a major figure in the abstract expressionist movement.He was widely noticed for his technique of pouring or splashing liquid household paint onto a horizontal surface, enabling him to view and paint his canvases from all angles.`,`American`],
[`Kehinde Wiley`,`Working exclusively in portraiture, Kehinde Wiley fuses traditional formats and motifs with modern modes of representation. Selecting works from old masters like Peter Paul Rubens or Jacques-Louis David, Wiley replaces the historical figures with handsome young black men. `,`American`],
[`Wassily Kandinsky`,`Wassily Wassilyevich Kandinsky was a Russian painter and art theorist. Kandinsky is generally credited as the pioneer of abstract art.`,`Russian`],
[`John Constable`,`John Constable, was an English landscape painter in the Romantic tradition. Born in Suffolk, he is known principally for revolutionizing the genre of landscape painting with his pictures of Dedham Vale, the area surrounding his home – now known as "Constable Country" – which he invested with an intensity of affection`,`British`],
[`Kerry James Marshall`,`Kerry James Marshall challenges the marginalization of African-Americans through his formally rigorous paintings, drawings, videos, and installations, whose central protagonists are always, in his words, “unequivocally, emphatically black.”`,`American`],
[`Anita Malfatti`,`Anita Catarina Malfatti is heralded as the first Brazilian artist to introduce European and American forms of Modernism to Brazil. Her solo exhibition in Sao Paulo, from 1917–1918, was controversial at the time, and her expressionist style and subject were revolutionary for complacently old-fashioned art expectations.`,`Brazilian`]
]

const genreData = [
`Modern Art`,
`Pop Art`,
`Futurism`,
`Surrealism`,
`Abstract Expressionism`,
`Installation Art`,
`Minimalism`,
`Renaissance`,
`Performance Art`,
`Post-Impressionist`,
`Impressionist`,
`Baroque`,
`Neo-Impressionism`,
`Genre painting`,
`Cubism`,
`Realism`,
`Graffiti`,
`Romanticism`,
`Portraiture`,
`Contemporary`,
]

// this array comes from our data entry spreadsheet
// it has an array for each artwork, and each artwork's array contains:
// -the artwork index , array element 1
// -the artist index, array element 2
// -an array of the genre indices, array element 3 (which is itself an array, because art can have multiple genres)

// the indices are all off by 1 because that's how they're numbered in our data entry spreadsheet

const artworkAssociations = [
  [1,1,[1,2]],
  [2,2,[1,3]],
  [3,3,[1,4]],
  [4,3,[1,4]],
  [5,4,[1,5]],
  [6,4,[1,5]],
  [7,5,[1,6]],
  [8,6,[1,2,6]],
  [9,6,[1,2,6]],
  [10,7,[1,7]],
  [11,8,[8]],
  [12,9,[9]],
  [13,10,[10]],
  [14,10,[10]],
  [15,11,[4]],
  [16,12,[1]],
  [17,13,[11]],
  [18,14,[6]],
  [19,15,[12]],
  [20,16,[11]],
  [21,17,[13]],
  [22,20,[14]],
  [23,23,[15, 4]],
  [24,17,[13]],
  [25,24,[16, 17]],
  [26,26,[19]],
  [27,29,[20]],
  [28,23,[4]],
  [29,18,[11]],
  [30,19,[4]],
  [31,21,[12]],
  [32,22,[15]],
  [33,10,[10]],
  [34,21,[12]],
  [35,25,[5]],
  [36,27,[5]],
  [37,28,[18]],
  [38,10,[10]],
  [39,29,[20]],
  [40,30,[15]]
]

// this is similar to the artwork association array above but contains the genres for the artists

const artistAssociations = [
  [1,[1,2]],
  [2,[1,3]],
  [3,[1,4]],
  [4,[1,5]],
  [5,[1,6]],
  [6,[1,6]],
  [7,[1,7]],
  [8,[8]],
  [9,[9]],
  [10,[10]],
  [11,[4]],
  [12,[1]],
  [13,[11]],
  [14,[6]],
  [15,[12]],
  [16,[11]],
  [17,[13]],
  [18,[11]],
  [19,[4]],
  [20,[14]],
  [21,[12]],
  [22,[15]],
  [23,[4,15]],
  [24,[16,17]],
  [25,[5]],
  [26,[19]],
  [27,[5]],
  [28,[18]],
  [29,[20]],
  [30,[15]]
]

const users = [{"id":"23dfd934-edbb-4406-8f20-23039f32317f","name":"Manon Downton","email":"mdownton0@yale.edu","password":"ltZOqR3","isAdmin":false},
{"id":"87a735a4-78dd-40e6-aaad-d69f75cb8460","name":"Tadeo Drezzer","email":"tdrezzer1@dyndns.org","password":"aBkre1","isAdmin":false},
{"id":"44445c7d-2131-4d66-b89b-cac2192bb922","name":"Nikos Knowling","email":"nknowling2@nationalgeographic.com","password":"t394qP6EhR7","isAdmin":false},
{"id":"a4b145ba-a84d-44bb-8caf-81355a1e0402","name":"Gigi Yielding","email":"gyielding3@oakley.com","password":"5yhtE6","isAdmin":false},
{"id":"40c2d892-be64-4da7-91bb-fd4ee8dc3344","name":"Kirk Leall","email":"kleall4@berkeley.edu","password":"I1NWwgXSlQzC","isAdmin":false},
{"id":"b78c911a-5bff-4a78-8df0-3cd52449a63e","name":"Eddie Roberts","email":"eroberts5@webmd.com","password":"pQVwsyRQJ","isAdmin":false},
{"id":"75c5c3e2-3cf4-4a82-b861-239a16492f69","name":"Larry Dailly","email":"ldailly6@sakura.ne.jp","password":"cQ55vQgoiRR","isAdmin":false},
{"id":"37fb3b0c-137b-4000-b5a6-9bc625999a20","name":"Nickolas Roffe","email":"nroffe7@csmonitor.com","password":"CvLIGuHvhPhB","isAdmin":false},
{"id":"c48e642f-cfd4-40ce-bb21-b3cdfd346490","name":"Hamel Ghiraldi","email":"hghiraldi8@jigsy.com","password":"YPAnRdO2","isAdmin":false},
{"id":"d6d78331-d7a8-4442-8e26-d620ec08b08a","name":"Dagny Pitney","email":"dpitney9@patch.com","password":"lM1AYmf","isAdmin":false},
{"id":"0ab8ff5c-3d53-45d6-866f-6b3d33dec260","name":"Dale Marusic","email":"dmarusica@amazon.co.jp","password":"RWGZzfly","isAdmin":false},
{"id":"fa255a4e-2117-4476-a7c4-4cb7c0692ddc","name":"Shelli Cordet","email":"scordetb@com.com","password":"iOFEdtk","isAdmin":false},
{"id":"610b2859-06c2-40c5-ba49-9c40a93ff2a9","name":"Raquel Rainford","email":"rrainfordc@nps.gov","password":"FA9zpD4NUVL","isAdmin":false},
{"id":"a889eda3-e2cd-4138-85d4-fb6e662dee1e","name":"Luella Gabbott","email":"lgabbottd@ovh.net","password":"1ph0zQV","isAdmin":false},
{"id":"819899ff-d0c3-4ddf-bed8-1540daeb0180","name":"Ole Chavey","email":"ochaveye@sfgate.com","password":"AkcapXJOsR","isAdmin":false},
{"id":"f9fbad89-d819-437b-8508-a467b6725f61","name":"Aline Quantick","email":"aquantickf@imageshack.us","password":"wFSUlV7x","isAdmin":false},
{"id":"06578443-b0b2-4831-938a-49cf1c42f96a","name":"Ardelia Andrews","email":"aandrewsg@usgs.gov","password":"wmOofbGBUSHY","isAdmin":false},
{"id":"a11b980b-9708-4238-b649-c3561d3fcdd5","name":"Jase Chippindale","email":"jchippindaleh@macromedia.com","password":"VoaGQT","isAdmin":false},
{"id":"0a63010f-1746-4314-b04c-a0cb20413b4e","name":"Carmelita Yeoman","email":"cyeomani@biblegateway.com","password":"iQPUAdBIJcD","isAdmin":false},
{"id":"8b51fb44-9d39-478c-8982-83434e4f9cea","name":"Ferguson Dentith","email":"fdentithj@webeden.co.uk","password":"7waTpgPv","isAdmin":false}]

const seed = async () => {

  //first sync the DB

  await syncDB(true)

  //create each artwork in the dB and dump to an array

  const artworks = await Promise.all(artworkData.map(artArray => {
    const artwork = {
      title: artArray[0],
      description: artArray[1],
      year: artArray[2],
      medium: artArray[3],
      price: artArray[4],
      quantity: artArray[5]
    }
    return Artwork.create(artwork)
  }))

  // create each artist in DB and put in array

  const artists = await Promise.all(artistData.map(artistArray => {
    const artist = {
      name: artistArray[0],
      bio: artistArray[1],
      nationality: artistArray[2]
    }
    return Artist.create(artist)
  }))

  // create each genre in DB and drop in array

  const genres = await Promise.all(genreData.map(name => {
    return Genre.create({name})
  }))

  // I numbered the images sequentially. Right now we only have one image per
  // artwork. In the future (if we have, say, an image uploader in the admin area),
  // we can bother with associating multiple images with each artwork, perhaps have
  // a fancy slideshow for the artwork detail page

  const imageURLarray = []
  for(let i = 0; i < 40; i++) {
    imageURLarray[i] = `/img/${i}.jpg`
  }

  const images = await Promise.all(imageURLarray.map(imageURL => {
    return ShopImage.create({imageURL, order: 0})
  }))

  //this sets the image for each artwork

  await Promise.all(artworks.map((artwork, ix) => {
    artwork.addShopImage(images[ix])
  }))

  //this sets the artist for each artwork according to the association array above

  await (artworks.map((artwork, ix) => {
    const artistIndex = artworkAssociations[ix][1] - 1
    const artist = artists[artistIndex]
    artwork.setArtist(artist)
  }))

  //this sets the genres for each artwork according to the association array above

  await Promise.all(artworks.map((artwork, ix) => {
    const genreArray = artworkAssociations[ix][2]
    return genreArray.map(genreIx => {
      const genre = genres[genreIx - 1]
      return artwork.addGenre(genre)
    })
  }).flat())

  //this sets the genres for each artist according to the association array above

  await Promise.all(artists.map((artist, ix) => {
    const genreArray = artistAssociations[ix][1]
    return genreArray.map(genreIx => {
      const genre = genres[genreIx - 1]
      return artist.addGenre(genre)
    })
  }).flat())

  const hashedPW = await bcrypt.hash('test', 10)

  const [ zoe, zaina, adam, jamil ] = await Promise.all([
    User.create({ email: 'zoe@zoe.com', password: hashedPW }),
    User.create({ email: 'zaina@zaina.com', password: hashedPW }),
    User.create({ email: 'adam@adam.com', password: hashedPW }),
    User.create({ email: 'jamil@jamil.com', password: hashedPW })
  ]);

  const today = new Date();
  const [ order1, order2, order3 ] = await Promise.all([
    Order.create({
      date: today,
      status: 'Created',
      address: '1234 First St'
    }),
    Order.create({
      date: today,
      status: 'Processing',
      address: '567 Second St'
    }),
    Order.create({
      date: today,
      status: 'Completed',
      address: '89 Third St'
    })
  ]);

  const [ orderItem1, orderItem2, orderItem3, orderItem4 ] = await Promise.all([
    OrderItem.create({
      orderedPrice: 100.00,
      orderedQuantity: 2
    }),
    OrderItem.create({
      orderedPrice: 90.00,
      orderedQuantity: 1
    }),
    OrderItem.create({
      orderedPrice: 40.00,
      orderedQuantity: 1
    }),
    OrderItem.create({
      orderedPrice: 1.00,
      orderedQuantity: 2
    })
  ])

  zoe.addOrder(order1);
  zoe.addOrder(order2);
  zaina.addOrder(order3);
  order1.addOrderItem(orderItem1);
  order1.addOrderItem(orderItem2);
  order2.addOrderItem(orderItem3);
  order3.addOrderItem(orderItem4);
  artworks[0].addOrderItem(orderItem1);
  artworks[1].addOrderItem(orderItem2);
  artworks[2].addOrderItem(orderItem3);
  artworks[3].addOrderItem(orderItem4);
   await Promise.all(users.map(u => {
      const user =  {
      name: u.name,
      email: u.email,
      password: '',
      isAdmin: u.isAdmin
    }
    return User.create(user);
  }))
}

seed()

module.exports = seed;
