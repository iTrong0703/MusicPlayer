const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER_STORAGE_KEY';

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const playlist = $('.playlist');
const cdThumbnail = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const videoBg = $('#videoBg');
const timeLeft = $('.time-left');
const timeRight = $('.time-right');
const muteIcon = $('.icon-mute');
const unmuteIcon = $('.icon-unmute');
const volumeBar = $('.volume-bar');
const cdProgressFull = $('.cd .circle .mask.full')
const cdProgressFill = $$('.cd .circle .mask .fill')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currentVolume: 1,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}, // get data từ localStorage và chuyển về dạng OBJECT thông qua JSON.parse

    songs: [
        {
            name: '(พี่ชอบหนูที่สุดเลย) I Like You The Most',
            singer: 'PONCHET ft.VARINZ',
            path: 'https://cf-media.sndcdn.com/xAH1Fedjj5Hj.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20veEFIMUZlZGpqNUhqLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA4Njk5fX19XX0_&Signature=ZnU5RzDuAi6k58USBJC7F5vgXKidMBBkt590LmwHIBOtjCj4ZShxLHCkZuIVZDsqRLyuX7wKJOF6~hMHLMA0PrIhnZqZaT2~K39L2pR4uC2J3MYGoSaPzvM7FmJUJlKXo4ien-mmAcfo2UydO0vCO14MPFBI1HFq1bv~fsNSQgeBOtPY0VJ33tsoryFRC7uClJ497RlJ6UnIOJQSK8u7D1NXC0LKh2rq6UAoeS4NnlbnxJ0jlkCFHKls1Ad08Hq5q9mvrbLvGvXMf4aVKpaJpAdUxPEk-iwi3xSHpp3DdNeGjSz2IqXsM5KTmy8LGc2SL3U3j5TWdCjrlgILcPoZQw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-DpmVcvQeujrCx374-KpTpVA-t500x500.jpg'
        },
        {
            name: 'Steal The Show',
            singer: 'Lauv',
            path: 'https://cf-media.sndcdn.com/wx5VEWDIKM9Y.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vd3g1VkVXRElLTTlZLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA3OTE5fX19XX0_&Signature=QB~kP4PbGUNwmCZ-uxq-k0wioKqjrIyNoKi-IgAJoRqAGPkCFQ8u4OxxdeDTdI96Jr8wIEdfL-74iPdUJ8xjDiT7-WPEc~T~vODO9BXco5PSAb3BflgUBehgTEXSN4tx4hMYYZ~uvP5qEV2rwZ-aayAVHHFaLGyM-J5P7RHNPPoRaJNbHa~buRQaIwkFfo9o-pwkC0QG07DvshF~RazAeNrixg08CB5QH6vSearfZOo2brTdjOzO8T68k3uOKnCKawpBPCFQMZOLSkKwXSHAGI2dUsDIsyFoyv5Q25nxr3skp~y-KtXTDIL8CgJ~JmBjpWe8z7zA7ddnYBMtW9kdVg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-UmVOedyDdHOVVMYd-NcZ73A-t500x500.jpg'
        },
        {
            name: 'someone will love you better',
            singer: 'Johnny Orlando',
            path: 'https://cf-media.sndcdn.com/NYqhxhI4EVDh.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vTllxaHhoSTRFVkRoLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA4MzQ4fX19XX0_&Signature=L6BQI3MLVbpebQSFzUNLdO-6kmuiNoOGOmbVKm2IQ2sf~PvO2A41nZDLPTMObCBfH3kvnYlm2y1-rZN2ULa7qirtZJHVqW2HBi2ruH9JdrCtoJmokBrQlctddm6ZH8cpcV6l2DN~XOPArpdOS1sNEW4cS8UiALXHhexiJuyRu3a~6sk7YAJMLifLU7eKm8Ajb2EYExyGhhHpQ70QFnubGLOR6~raujAZEJbK8KodsCydrlC2ZFkTYrOp-zCedQbOgpmWnbO6VdNS74yWvXTnfVGlWVKvRpvu5FAIEYCVrumuZopB0N1NyuUBq7S015SG046~yV-vXJk8nIoaFKdEUQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-broNPIQWEXVV-0-t500x500.jpg'
        },
        {
            name: 'The Way Life Goes',
            singer: 'Lil Uzi Vert',
            path: 'https://cf-media.sndcdn.com/EPMUPBO2li86.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vRVBNVVBCTzJsaTg2LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA4NDk0fX19XX0_&Signature=dXtvI6hM4ZY4HYQOci7W0z5bJCVMcEikRSwquqeq7ZICHfc2B75p5TsPTbeYy857faygMXk4ksWhQBKgnpaiB332MssqyOmhm0aSru0DJhsx0DJXIZbw2OnThonD-vsVKWvo3Sq8ScqiWmST86yC6thVgUYoMI3yGSBtm4FEJgGntD-R6MZuBfaLRqjf5SjgylWxWd5ip5~mkMJHxv6jYTCaiN4b107Wjj2H8zsboN3fDbif8vUwFnaaK2FdFQ5vpBtURBmaRZ-9S~ISke9thFfQeed9v-qC18wXtykNXHPWsLuzg60SFANRGWUBtjnl0rtaTmp0-iO26JT~e22MCQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000243023626-d6x2lw-t500x500.jpg'
        },
        {
            name: 'Sweet Night',
            singer: 'V (BTS)',
            path: 'https://cf-media.sndcdn.com/A1LHM38Pmo2u.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vQTFMSE0zOFBtbzJ1LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA5MDIxfX19XX0_&Signature=AI45qSDLoCqOkk0uzOcjYbype4cZJfJ5vnzGITL6-wso6WNMhMgkKlV~EL~Vk927flX~QR2mcKbUDTLbqKIocKv7UurDrelFFs2fxPnorCIP5Pbjgl~LEdsghe33LgEfqOzUQ8MddreaJkfdLMov0pK0vUhfejJrXyJdll81DYqDPyQb0UQQCtvjGRCN~8x3Fg6Ff~AyxsrR1Dhsd8JkoZFcpYn3V36rYME0Wppsuu-j3wIS5Db8HjjIBr-LrqqAx6jKlKwYFYO4tu-LehXXUYS86WE85ykW0fLIlT6f2M98GJla3RDi8cPl3a3ClWfj9n94IB5--AQZ3Hh0maXjMw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-5AErboM1HAxnemty-273zoA-t500x500.jpg'
        },
        {
            name: 'Mong Cho',
            singer: 'i.xuan',
            path: 'https://cf-media.sndcdn.com/FQo7iUm25ey4.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vRlFvN2lVbTI1ZXk0LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA5MjQxfX19XX0_&Signature=Ne~GOCXWttNMW2rwgoQ~mFv8luWjRvh1jQnAc5bNAt5JXvgB2wVbjlAjwZjP6zQV~nH5lsu~qH3Tql4nzxyih3Efee1d1HJOqj6AhVZJx8JvfZucCIVAwEN6NtzoWAqR7HZp0izT0GsjhH9vgVgm7ml7yzDBPKEG31ZIzeoc-HYtV0oVW5CbCsbyNUOMPOuRH2mw1wWzYEaJdvqjZegmUlFD0SATqJDkfacqWnmNsqcnCjRb6N7sFyWhB8veg0uhDyGLixoK62RVAWPpPcWy2tTvnVjoHQYFOhGvc4A~KMEyNJ0DOi5r18GftPfmzvNwW8lwSEwkX1UgD2Ae3VOWZg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-qUIQIjWzZKbc59Fi-L2ICGg-t500x500.jpg'
        },
        {
            name: 'I Love You So',
            singer: 'THE WALTERS',
            path: 'https://cf-media.sndcdn.com/aUDqxBU97W52.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vYVVEcXhCVTk3VzUyLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDA5OTQxfX19XX0_&Signature=OZABUTWJHCgUbRCbCOaFxyRkzJB90pZzKqhuZbhbJlk68BfdfXGrvtNCRb-giGjq-i3AWNfST1wQ~vHr4Pr2zuJq8p3dGu3HR0eSkyYJU5cRs5My6T~P75Z0auqRX6BiSZRe7HmZ6qcs8WllZsO8nJ-v5QlueGAw-69KwpEUW4WXN-TRZ8WH4k9FhUUspo2LDCx6IfsbNESjlR-ektyHtxO~ksg2HWUYfM9G3YHH6b7y9-nc6Me6YkgAo6EvxPrK0lXHb6RGJC4cCtLSK3m7-8ARX2g6Nc-Jlq2nfPnjL40SxbNYc-xKaIIvwmt3rqMEramfy2S-ymaLxFeP1OLyfQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000098822307-nwhex2-t500x500.jpg'
        },
        {
            name: 'ghosts',
            singer: 'highvyn',
            path: 'https://cf-media.sndcdn.com/7fhWVy2UtwQZ.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vN2ZoV1Z5MlV0d1FaLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwMTU5fX19XX0_&Signature=TBhbj5Q9LdOydIZR4xaerBvZEisntavJDwTeuxaXAOcWqfRKkHgObzdLzmel8WfsjwWoCUv7pdjhqiUJ7fvmeOdqQmlFlMdYT-B81uIVKNdwxo2l2FOjXlU7uDZ3lZhHBv2Ckm6Lupsu3dRWCcIDaWpyWTAAxmoUWoIhrrSf0UTlt2AHj42480DvHdHeIaFuo3sQ53KLy3d-2Y0IuWIkoCTIC0CX756~KUOhNqY8gewnQoUwCv07JIS0sD33~-yQVB23lJTTyrMO5D6sBOrmrMfv3o59fpMahqc2OjjoV8x-wuzIxWLof0P-AoJKARZSbkro8cAVv8ug17o21YA4~A__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-nID7zC6Yhv8dPTYt-mqWN8Q-t500x500.jpg'
        },
        {
            name: 'Snow Flower',
            singer: 'V of BTS (feat. Peakboy)',
            path: 'https://cf-media.sndcdn.com/gltF666n51cj.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ2x0RjY2Nm41MWNqLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwNjM1fX19XX0_&Signature=BdkLgC4rLiI6GloumdQBGC0OjV-Hg4k~xb1jV-xFF0U2HSxU-Z~DzxX3Hs4pYDmMsWdz5PnQLWoeRBZ9ZYoeUuGhZ20Z8dh2xYOAfRe~ZJ9SoOdMe8VuFlV-MflsCB2zwJkbSwc~WtxREmzgq8ByIJnD5t3iZIGiPc-SmsAqAHBJh8Gz4ZBENxYEPOqHOXPTO8zto7tJ0vpZdd5fnzqfZZqiqwAmkrSI-h1HThCZk7Uhf-~JTsnphjSzWFxh7xKRKIUVQ6BX16f2Q4jc96RdTeT--izH0m4zNwbxSWtW1G2bpx9JwdxD~dgOkVkyLRvIGrC26gnh0S6NVGXv5u28nA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-0r6hjcT7hOyGUrfm-RdfmMg-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        },
        {
            name: 'Daft Punk',
            singer: 'Veridis Quo x In Your Eyes - The Weeknd',
            path: 'https://cf-media.sndcdn.com/GM7K2VhnFOuC.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR003SzJWaG5GT3VDLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA4MDEwOTQ2fX19XX0_&Signature=fR2iKZBX3JmisnW7lqz4msUIGCtY8jZ8eW318knkl3X2wgnoSZjykvLJ3nU-waSSdRQBsJ93-9lLn1tVsXWaFSpi7MTcs~EYfoLWkQRFpbx0OWe341fZUfi1dq~H~It2~xukaCosC1VIhvx7mcdRMlbU1MjkhIwwXHNzItcRQ-GHUqBBYEtnIKB7QBxingwXEHmRmZKyQ9oLnppxcngSCNmroC9J6UuVxTihyPTlqmfjWXazVHpRvruVxgUbJ0VIFFSk4sjNBMEO~2v~p~d9t5loAx8RvoCq-RK2bkMmfDK18kbgvJiVJCKpDrFD0NpeTUzSNyZ1Sa-bLjHpBAbEcg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-MSHCvjbWzbhupEFF-rDrAGQ-t500x500.jpg'
        }
    ],
    playedSongs: [],
    // add data vào local storage
    setConfig: function(key, value) {
        this.config[key] = value; // tạo ra object config có chứa key và value tương ứng
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)); // chuyển OBJECT sang String dựa vào JSON.stringify sau đó lưu data vào localStorage dựa theo key PLAYER_STORAGE_KEY
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${this.currentIndex === index ? "active" : ""}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active",  this.isRepeat);
    },
    formatTime: function(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        
        const formattedTime = `${minutes}:${remainderSeconds.toString().padStart(2, '0')}`;
        return formattedTime;
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() { // thay vì tạo getCurrentSong() thì ta có thể gọi trực tiếp thành app.currentSong
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function() {
        const _this = this; // gán _this bằng this của handleEvents là thằng "app"
        const cdWidth = cd.offsetWidth; // lấy ra width (do dùng padding top nên khi đổi width là sẽ đổi luôn height)
        
        // Sự kiện quay đĩa nhạc khi phát
        const cdThumbAnimate = cdThumbnail.animate([
            {//https://viblo.asia/p/tim-hieu-javascript-web-animations-api-LzD5dX2Y5jY
                transform: 'rotate(0)'
            },
            {
                transform: 'rotate(359deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity// lặp vô hạn
        });
        cdThumbAnimate.pause();// pause trước, khi nào ấn play mới quay đĩa

        // xử lý thu phóng đĩa nhạc
        document.onscroll = function() {
            // console.log(window.scrollY); //tuong tu console.log(document.documentElement.scrollTop);
            if (window.innerWidth <= 739) {// chỉ áp dụng vs mobile
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
                // Thu nhỏ đĩa cd nhạc
                const newCdWidth = cdWidth - scrollTop;
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;// fix bug nếu lướt nhanh thì sẽ sinh ra giá trị âm dẫn đến, cd không thu nhỏ
                cd.style.opacity = newCdWidth / cdWidth; // mờ dần khi nhỏ lại
           
            }
        }

        //xử lý chơi nhạc
        playBtn.onclick = function() {
            if(_this.isPlaying) { // nếu đang playing thì pause
                audio.pause();// https://www.w3schools.com/tags/ref_av_dom.asp
                videoBg.pause();
                cdThumbAnimate.pause(); // dừng quay đĩa nhạc
            } else {// nếu đang pause thì playing
                audio.play();// https://www.w3schools.com/tags/ref_av_dom.asp
                videoBg.play();
                cdThumbAnimate.play(); // bắt đầu quay đĩa nhạc
            }
        }

         //Lắng nghe sự kiện khi nhạc đang chạy thì xử lý
        audio.onplay = function() {
            _this.isPlaying = true; // không sài this vì this ở đây là playBtn, còn _this thì mới là "app" do ta mới gán lại
            player.classList.add('playing');// thêm class playing để đổi sang nút pause
        }

        //Lắng nghe sự kiện khi nhạc bị dừng thì xử lý
        audio.onpause = function() {
            _this.isPlaying = false; // không sài this vì this ở đây là playBtn, còn _this thì mới là "app" do ta mới gán lại
            player.classList.remove('playing');// thêm class playing để đổi sang nút pause
        }
        
        //Lắng nghe sự kiện nhạc phát đến time bao nhiêu thì progress di chuyển đến % bấy nhiêu
        audio.ontimeupdate = function() { //https://www.w3schools.com/tags/av_event_timeupdate.asp
            if(audio.duration) { // loại bỏ trường hợp NaN
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100); // tính ra % đã chạy của bài hát (currentTime: giây hiện tại; duration: thời lượng bài hát)
                progress.value = progressPercent;

                // Hiện time    
                console.log(audio.duration);
                timeLeft.textContent = _this.formatTime(Math.floor(audio.currentTime));
                timeRight.textContent = _this.formatTime(Math.floor(audio.duration));
                progress.style.background = `linear-gradient(to right, var(--primary-color) ${progress.value / progress.max * 100}%, #4d4d4d ${progress.value / progress.max * 100}%)`;
            }

            // fill vòng tròn sau đĩa nhạc
            const percent = progress.value / 100 * 180;
            cdProgressFull.style.transform = `rotate(${percent}deg)`;
            cdProgressFill.forEach(fillElement => {
                fillElement.style.transform = `rotate(${percent}deg)`;
            });

            
        }

        //Lắng nghe xem người dùng tua đến đoạn nào
        // sử dụng oninput thay vì onchange vì oninput nó thay đổi tức thì
        // còn onchange thì thay đổi khi người dùng xác nhận thay đổi đó
        progress.oninput = function(e) { //e.target.value lấy ra value người dùng tua đến
            const seekTime = (audio.duration * e.target.value) / 100;// tính ra số % tua đến của bài hát vừa tua
            console.log(seekTime);
            audio.currentTime = seekTime;
        }

        
        // Chuyển bài tiếp
        nextBtn.onclick = function() {

            if(_this.isRandom) {
                _this.nextRandomSong();
            } else { 
                _this.nextSong();
            }

            // thêm class active vào song
            _this.reRender();

            _this.scrollToActiveSong();//cuộn tới bài hát đang hát

            audio.play(); // sau khi next thì tự play luôn
        }

        // Về bài cũ
        prevBtn.onclick = function() {
            _this.prevSong();

            // thêm class active vào song
            _this.reRender();

            _this.scrollToActiveSong();//cuộn tới bài hát đang hát

            audio.play(); // sau khi next thì tự play luôn
        }

        // bật tắt chức năng random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom); // truyền thêm đối số boolean nếu nó true thì add vào và ngược lại
            _this.setConfig('isRandom', _this.isRandom);
            _this.playedSongs.push(_this.currentIndex);// thêm bài hiện tại đang nghe vào playedSongs sau khi bật random để tránh trường hợp bài hiện tại không được tính là playedSongs
        }

        // bật tắt chức năng lặp bài hát
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active",  _this.isRepeat);
            _this.setConfig('isRepeat', _this.isRepeat);
        }

        // Chuyển sang bài tiếp theo khi audio ended
        audio.onended = function() {// https://www.w3schools.com/tags/ref_av_dom.asp
            if(_this.isRepeat) {// phát lại nếu true
                audio.play();
            } else {
                nextBtn.click(); // tự click nút kế tiếp khi end bài
            }
        }

        playlist.onclick = function(e) { // gán onlclick vào cả list và lắng nghe xem user click ở chỗ target nào r dựa vào closet lấy ra class cha của nó
            const songNode = e.target.closest('.song:not(.active)');
            // e.target là đối tượng user click vào bao gồm cả ảnh, tên,...
            // closest là lấy ra phần tử cha gần nhất hoặc chính nó , không có thì trả về null
            // e.target.closest là lấy ra phần tử cha gần nhất của phần tử được click vào     
            if(songNode || e.target.closest('.option')) { // chỉ lấy phần tử .song không có .active || và lấy phần tử có cha là .option (là nút ... để download, sửa, xóa)
                if(!e.target.closest('.option')) {// Chọn bài hát hoặc chỉnh sửa nếu như không bấm vào option
                    // Thay vì dùng songNode.getAttribute('data-index') thì ta có thể dùng songNode.dataset.index do ta đã đặt tên Attribute là 'data-index' có chữ data
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.reRender();
                    audio.play();
                } else {
                    console.log('option');
                }
            }
        }

        //Xử lý khi click vào nút volume

        if (_this.currentVolume > 0) {
            volumeBar.value = _this.currentVolume
            audio.volume = _this.currentVolume
            $('.icon-unmute').style.visibility = 'visible'
            $('.icon-mute').style.visibility = 'hidden'
        } else {
            volumeBar.value = 0
            audio.volume = 0
            $('.icon-unmute').style.visibility = 'hidden'
            $('.icon-mute').style.visibility = 'visible'
        }
        audio.onvolumechange = () => {
            volumeBar.value = audio.volume
            if (audio.volume === 0) {
                muteIcon.style.visibility = 'visible'
                unmuteIcon.style.visibility = 'hidden'
            } else {
                muteIcon.style.visibility = 'hidden'
                unmuteIcon.style.visibility = 'visible'
            }
        }

        volumeBar.oninput = e => {
            this.setConfig("currentVolume", e.target.value)
            audio.volume = volumeBar.value
            volumeBar.setAttribute("title", "Âm lượng " + volumeBar.value * 100 + "%")
        }

        audio.onvolumechange = () => {
            volumeBar.value = audio.volume
            if (audio.volume === 0) {
                muteIcon.style.visibility = 'visible';
                unmuteIcon.style.visibility = 'hidden';
            } else {
                muteIcon.style.visibility = 'hidden';
                unmuteIcon.style.visibility = 'visible';
            }
        }

        muteIcon.onclick = (e) => {
            audio.volume = this.config.savedVolume;
            this.setConfig("currentVolume", audio.volume);
        }

        unmuteIcon.onclick = e => {
            this.setConfig("savedVolume", audio.volume);
            audio.volume = 0;
            this.setConfig("currentVolume", audio.volume);
        }

        
    },
    reRender: function() {
        $$('.song').forEach((song, index) => { // duyệt qua và thêm class active vào bài hát hiện tại
            if (index === this.currentIndex) {
                // Nếu có, thêm vào class "active"
                song.classList.add('active');
            } else {
                // Nếu không, xóa class "active"
                song.classList.remove('active');
            }
        });
    },
    
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({//https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                behavior: "smooth", // trượt một cách mượt
                block: "end"   // phần dưới của phần tử .song.active sẽ được căn chỉnh với phía dưới của phần tử chứa
            });
        }, 300);
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;// gọi currentSong trong defineProperties
        cdThumbnail.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path; 
    },
    loadConfig: function() { 
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    nextRandomSong: function() {
        let newIndex;
        
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
            console.log(1);
        } while(newIndex === this.currentIndex || this.playedSongs.includes(newIndex)); // lặp đến khi nào không trùng cái cũ hoặc bài hát đã phát thì thoát vòng lặp
        this.playedSongs.push(newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    
        if(this.playedSongs.length == this.songs.length) { // nếu đã phát hết danh sách rồi thì làm mới lại mảng đã phát
            this.playedSongs = [];
            this.playedSongs.push(newIndex);// để tránh lặp bài cuối ta cũng đẩy nó vào danh sách mới
        }
    },

    start: function () {
        this.loadConfig();// gán cấu hình vào ứng dụng

        this.defineProperties();//định nghĩa ra các thuộc tính

        this.handleEvents();// lắng nghe xử lý sự kiện DOM

        this.loadCurrentSong();// load current song khi chạy 


        this.render();// render list nhạc
    }
}

// Giúp ứng dụng chỉ gọi duy nhất 1 lần là thằng start(), đỡ phải gọi nhiều hàm
app.start();