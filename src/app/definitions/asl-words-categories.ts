import { CategoryDefinition } from '../types/base.types';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */

export const Categories: Readonly<CategoryDefinition[]> = [
    {
        name: 'Daily Use',
        words: [
            'ASL-Hello',
            'ASL-How Are You',
            'ASL-Whatsup',
            // TODO What's up (v2)
            // TODO Nice to meet you
            'ASL-Good',
            'ASL-Bad',
            // TODO Yes
            // TODO No
            // TODO So-so
            // TODO Sick - INDEX
            // TODO Sick (v2)
            // TODO Hurt
            'ASL-Your Welcome',
            // TODO Goodbye
            'ASL-Good Morning',
            'ASL-Good Afternoon',
            'ASL-Good Evening',
            'ASL-Good Night',
            // TODO See you later
            // TODO Please
            // TODO Sorry
            // TODO Forget
            // TODO Sleep / Sleepy
            // TODO Bed
            // TODO Jump / Change world - RED
            // TODO Thank you
            // TODO I love you
            'ASL-ILY',
            'ASL-Go Away',
            // TODO Going to - RED
            // TODO Follow
            'ASL-Come',
            // TODO Hearing (Person)
            // TODO Deaf
            // TODO Deaf (v2)
            // TODO Hard of Hearing
            'ASL-Mute',
            // TODO Write Slow
            // TODO Can't read
            'ASL-Away',
        ],
    },
    {
        name: 'Pointing use Question / Answer',
        words: [
            'ASL-I',
            // TODO Him/Her/He/She/It/You - RED
            'ASL-Her',
            'ASL-My',
            // TODO His/Hers/Its/Your
            'ASL-We',
            'ASL-They',
            'ASL-Their',
            // TODO Over There - RED
            'ASL-Our',
            'ASL-Its',
            'ASL-Inside',
            'ASL-Outside',
            'ASL-Outside (Outdoors)',
            'ASL-Hidden',
            'ASL-Behind',
            'ASL-Above',
            'ASL-Below',
            'ASL-Here',
            'ASL-Beside',
            // TODO Back
            // TODO Front
            'ASL-Who',
            'ASL-Where',
            'ASL-When',
            'ASL-Why',
            'ASL-Which',
            'ASL-What',
            'ASL-What2',
            'ASL-How',
            // TODO How (v2)
            'ASL-How Many',
            'ASL-How Many2',
            'ASL-Can',
            "ASL-Can't",
            'ASL-Want',
            'ASL-Have',
            'ASL-Get',
            'ASL-Will',
            'ASL-Take',
            // TODO Need - INDEX
            'ASL-Must',
            'ASL-Not',
            'ASL-Or',
            'ASL-And',
            'ASL-For',
        ],
    },
    {
        name: 'Common',
        words: [
            // TODO Teach
            'ASL-Learn',
            'ASL-Person',
            'ASL-Student',
            'ASL-Teacher',
            // TODO Friend
            'ASL-Sign',
            'ASL-Language',
            'ASL-Understand',
            'ASL-Know',
            "ASL-Don't Know",
            'ASL-Be Right Back (BRB)',
            'ASL-Accept',
            'ASL-Denial',
            'ASL-Name',
            'ASL-New',
            'ASL-Old',
            'ASL-Very',
            'ASL-Jokes',
            'ASL-Funny',
            'ASL-Play',
            'ASL-Favorite',
            'ASL-Draw (Pencil)',
            'ASL-Stop',
            'ASL-Read',
            'ASL-GT4tube-Make',
            'ASL-Write',
            'ASL-Again  Repeat',
            'ASL-Slow',
            'ASL-Fast',
            'ASL-Rude',
            'ASL-Eat',
            'ASL-Drink',
            'ASL-Watch',
            'ASL-Work',
            'ASL-Live',
            'ASL-GT4tube-Live',
            'ASL-Play Game',
            'ASL-Same',
            'ASL-Allright',
            'ASL-People',
            'ASL-Browsing the Internet',
            'ASL-Movie',
        ],
    },
    {
        name: 'People',
        words: [
            'ASL-GT4tube-Family',
            'ASL-Boy',
            'ASL-Girl',
            'ASL-Brother',
            'ASL-Sister',
            'ASL-Brother in Law',
            'ASL-Sister in Law',
            'ASL-Father',
            'ASL-Grandpa',
            'ASL-Mother',
            'ASL-Grandma',
            'ASL-Baby',
            'ASL-Child',
            'ASL-Teen',
            'ASL-Adult',
            'ASL-Aunt',
            'ASL-Uncle',
            'ASL-Stranger',
            'ASL-Acquaintance',
            'ASL-Parents',
            'ASL-Born',
            'ASL-Dead',
            // TODO!!! 'ASL-Dead (Variant 2)' ???
            'ASL-Marriage',
            'ASL-Divorce',
            'ASL-Single',
            'ASL-Young',
            'ASL-Old',
            'ASL-Age',
            'ASL-Birthday',
            'ASL-Celebrate',
            'ASL-Enemy',
            'ASL-Interpreter',
            'ASL-No One',
            'ASL-Anyone',
            'ASL-Someone',
            'ASL-Everyone',
        ],
    },
    {
        name: 'Feelings / Reactions',
        words: [
            'ASL-Like',
            'ASL-Hate',
            'ASL-Fine',
            'ASL-Tired',
            // TODO Sleep / Sleepy
            'ASL-Confused',
            'ASL-Smart',
            // TODO Attention / Focus
            'ASL-Nevermind',
            'ASL-Angry',
            'ASL-Laughing',
            'ASL-LOL',
            'ASL-Curious',
            'ASL-In Love',
            'ASL-Awesome',
            'ASL-Great',
            'ASL-Nice',
            'ASL-Cute',
            'ASL-Feel',
            'ASL-Pity',
            'ASL-Envy',
            'ASL-Hungry',
            // TODO Alive
            'ASL-Bored',
            'ASL-Cry',
            'ASL-Happy',
            'ASL-Sad',
            'ASL-Suffering',
            // TODO Surprised
            'ASL-Careful',
            'ASL-Enjoy',
            'ASL-Disgusted',
            'ASL-Embarassed',
            'ASL-Shy',
            'ASL-Lonely',
            'ASL-Stressed',
            'ASL-Scared',
            'ASL-Excited',
            'ASL-Shame',
            'ASL-Struggle',
            'ASL-Friendly',
            'ASL-Mean',
        ],
    },
    {
        name: 'Value',
        words: [
            'ASL-More',
            'ASL-Less',
            'ASL-Big',
            'ASL-Small',
            'ASL-Full',
            'ASL-Empty',
            'ASL-Half',
            'ASL-Quarter',
            'ASL-Long',
            'ASL-Short',
            'ASL-Many',
            'ASL-Unlimited',
            'ASL-Limited',
            'ASL-GT4tube-All1',
            'ASL-GT4tube-All2',
            'ASL-Nothing',
            'ASL-Ever',
            'ASL-Everything',
            'ASL-Everytime',
            'ASL-GT4tube-Always',
            'ASL-Often',
            'ASL-Sometimes',
            'ASL-GT4tube-Heavy',
            'ASL-Lightweight',
            'ASL-Hard',
            'ASL-Soft',
            'ASL-GT4tube-Strong',
            'ASL-Weak',
            'ASL-First',
            'ASL-Second',
            'ASL-Third',
            'ASL-Next',
            'ASL-Last',
            'ASL-Before',
            'ASL-After',
            'ASL-GT4tube-Busy',
            'ASL-Free',
            'ASL-High',
            'ASL-Low',
            'ASL-Fat',
            'ASL-Thin',
            'ASL-Value',
        ],
    },
    {
        name: 'Time',
        words: [],
    },
    // {
    //     name: 'VRChat',
    //     words: [],
    // },
    // {
    //     name: 'Alphabet / Numbers (Fingerspelling)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p1)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p2: Ben-Cor)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p3: Bou-Esc)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p4: Exc-Ins)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p5: Int-Pas)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p6: Pat-Sav)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p7: Say-Try)',
    //     words: [],
    // },
    // {
    //     name: 'Verbs & Actions (p8)',
    //     words: [],
    // },
    // {
    //     name: 'Food',
    //     words: [],
    // },
    // {
    //     name: 'Animals / Machines',
    //     words: [],
    // },
    // {
    //     name: 'Places',
    //     words: [],
    // },
    // {
    //     name: 'Stuff / Weather',
    //     words: [],
    // },
    // {
    //     name: 'Clothes / Equipment',
    //     words: [],
    // },
    // {
    //     name: 'Fantasy / Characters',
    //     words: [],
    // },
    // {
    //     name: 'Holidays / Special Days',
    //     words: [],
    // },
    // {
    //     name: 'Home stuff',
    //     words: [],
    // },
    // {
    //     name: 'Nature / Environment',
    //     words: [],
    // },
    // {
    //     name: 'Talk / Asking exercises (SEE)',
    //     words: [],
    // },
    // {
    //     name: 'Countries',
    //     words: [],
    // },
    // {
    //     name: 'Colors',
    //     words: [],
    // },
    // {
    //     name: 'Materials',
    //     words: [],
    // },
    // {
    //     name: 'Medical',
    //     words: [],
    // },
] as const;
