const clothingData = [
    {
      id: '1',
      gender: 'Masculine',
      categories: [
        {
          id: '1',
          title:'hat',
          color:'red',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/hat.png'),
        },
        {
          id: '2',
          title: 'jeans',
          color:'blue',
          material:'cotton',
          bodypart:'legs',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jeans/jeans.png'),
        },
        {
          id: '5',
          title:'glasses',
          color:'yellow',
          material:'cotton',
          bodypart:'glasses',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/glasses/glasses.png'),
        },
        {
          id: '6',
          title:'tshirt',
          color:'blue',
          material:'cotton',
          bodypart:'body',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/body/TSHIRTAZUL.png'),
        },
        {
          id: '7',
          title:'tshirt',
          color:'pink',
          material:'cotton',
          bodypart:'body',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/body/TSHIRTROSA.png'),
        },
        {
          id: '8',
          title:'tshirt',
          color:'purple',
          material:'cotton',
          bodypart:'body',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/body/TSHIRTROXA.png'),
        },
        {
          id: '9',
          title:'tshirt',
          color:'green',
          material:'cotton',
          bodypart:'body',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/body/TSHIRTVERDETROPA.png'),
        },
        {
          id: '10',
          title:'tshirt',
          color:'green',
          material:'cotton',
          bodypart:'body',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/body/TSHIRTVERDE.png'),
        },
        {
          id: '11',
          title:'tshirt',
          color:'red',
          material:'cotton',
          bodypart:'body',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/body/TSHIRTVERMELHA.png'),
        },
        {
          id: '12',
          title: 'coat',
          color:'blue',
          material:'leather',
          bodypart:'jacket',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jacket/CASACOAZUL.png/'),
        },
        {
          id: '13',
          title: 'coat',
          color:'brown',
          material:'leather',
          bodypart:'jacket',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jacket/CASACOCASTANHO.png/'),
        },
        {
          id: '14',
          title: 'coat',
          color:'purple',
          material:'leather',
          bodypart:'jacket',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jacket/CASACOROXO.png/'),
        },
        {
          id: '15',
          title: 'coat',
          color:'green',
          material:'leather',
          bodypart:'jacket',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jacket/CASACOVERDE.png/'),
        },
        {
          id: '16',
          title: 'coat',
          color:'green',
          material:'leather',
          bodypart:'jacket',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jacket/CASACOVERDETROPA.png/'),
        },
        {
          id: '17',
          title: 'coat',
          color:'red',
          material:'leather',
          bodypart:'jacket',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/jacket/CASACOVERMELHO.png/'),
        },
        {
          id: '18',
          title:'cap',
          color:'blue',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/BONÉAZUL.png'),
        },
        {
          id: '19',
          title:'cap',
          color:'grey',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/BONÉCINZA.png'),
        },
        {
          id: '20',
          title:'cap',
          color:'purple',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/BONÉROXO.png'),
        },
        {
          id: '21',
          title:'cap',
          color:'green',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/BONÉVERDE.png'),
        },
        {
          id: '22',
          title:'cap',
          color:'green',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/BONÉVERDETROPA.png'),
        },
        {
          id: '23',
          title:'cap',
          color:'red',
          material:'cotton',
          bodypart:'head',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/head/BONÉVERMELHO.png'),
        },
        {
          id: '24',
          title: 'shoes',
          color:'yellow',
          material:'leather',
          bodypart:'feet',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/shoes/SAPATILHAAMARELA.png/'),
        },
        {
          id: '25',
          title: 'shoes',
          color:'blue',
          material:'leather',
          bodypart:'feet',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/shoes/SAPATILHAAZUL.png/'),
        },
        {
          id: '26',
          title: 'shoes',
          color:'purple',
          material:'leather',
          bodypart:'feet',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/shoes/SAPATILHAROXA.png/'),
        },
        {
          id: '27',
          title: 'shoes',
          color:'green',
          material:'leather',
          bodypart:'feet',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/shoes/SAPATILHAVERDE.png/'),
        },
        {
          id: '28',
          title: 'shoes',
          color:'red',
          material:'leather',
          bodypart:'feet',
          tempmin:'10',
          tempmax:'30',
          climate:'sun',
          image: require('../assets/clothes/masculine/shoes/SAPATILHAVERMELHA.png/'),
        },
      ],
    },
    {
      id: '2',
      gender: 'Feminine',
      categories: [
        {
        },
      ],
    },
  ];

export default clothingData;