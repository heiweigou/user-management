import React from 'react';
import logo from './logo.svg';
import './App.css';
import { stat } from 'fs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { format, compareAsc } from 'date-fns'
import { it } from 'date-fns/esm/locale';
import Create from './Create'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [
        {
          "index": 0,
          "incident": "INC5d92bbad1fb29e0d5918082f",
          "app": "SCATS",
          "name": "Harrington Lane",
          "email": "JeannieAlvarez",
          "department": "SUPPORTAL",
          "typeOfAccess": "insert and update",
          "approvedBy": "Mara Rios",
          "approvedByITS": "Jeanne Solis",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Thu Apr 05 2018 11:32:32 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Thu Aug 01 2019 01:52:26 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Nostrud irure amet anim dolore cillum nostrud laboris sunt sint ullamco Lorem. Laboris commodo enim dolor laboris ex voluptate tempor enim. Amet ad deserunt est anim exercitation anim ea incididunt duis in. Incididunt ullamco in in non non in cupidatat amet.\r\n",
          "createdBy": "Fletcher Vasquez",
          "updatedBy": "Margaret Lott",
          "lastUpdated": ""
        },
        {
          "index": 1,
          "incident": "INC5d92bbad79f32d63ed8173a7",
          "app": "RAI",
          "name": "Bettye Rosales",
          "email": "ArlineRoman",
          "department": "ATOMICA",
          "typeOfAccess": "read",
          "approvedBy": "Bentley Allison",
          "approvedByITS": "Valeria Leonard",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Fri Jun 21 2019 14:12:49 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Sun Feb 23 2020 09:34:27 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Anim occaecat ullamco non est aliqua ad cillum reprehenderit id culpa occaecat et amet sit. Adipisicing minim sit aute est velit culpa. Elit exercitation nostrud Lorem minim. Voluptate aute dolor deserunt minim. Dolor incididunt dolore amet nulla cupidatat.\r\n",
          "createdBy": "Kelley Dixon",
          "updatedBy": "Elise Moran",
          "lastUpdated": ""
        },
        {
          "index": 2,
          "incident": "INC5d92bbad188778bb4fe21115",
          "app": "RAI",
          "name": "Cathryn Waller",
          "email": "WardHarrington",
          "department": "BYTREX",
          "typeOfAccess": "read",
          "approvedBy": "Jean Gentry",
          "approvedByITS": "Tiffany Doyle",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Wed Jul 12 2017 10:42:42 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Thu Nov 07 2019 21:10:22 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Amet laboris nisi elit nisi Lorem non officia id quis pariatur irure officia. Sunt ullamco laboris dolore nulla aliqua do anim fugiat duis ullamco nulla sunt aute. Nostrud ex aliqua labore aliqua adipisicing nulla cupidatat incididunt proident ea ut dolor proident sit. Proident sint dolore do tempor occaecat eiusmod culpa duis exercitation quis. Lorem sunt aliqua cillum culpa in consectetur velit ad anim reprehenderit. Lorem velit labore quis laboris amet aute laborum nisi.\r\n",
          "createdBy": "Brooks Holcomb",
          "updatedBy": "Hollie Greene",
          "lastUpdated": ""
        },
        {
          "index": 3,
          "incident": "INC5d92bbadf7e14a833d496562",
          "app": "RAI",
          "name": "Daphne Gould",
          "email": "OlsonGillespie",
          "department": "TUBESYS",
          "typeOfAccess": "read",
          "approvedBy": "Mai William",
          "approvedByITS": "Janie Walls",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun Sep 01 2019 07:33:56 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Mon Dec 30 2019 10:56:20 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Ex commodo aliqua irure enim deserunt et ex ut et ad incididunt. Ad proident cillum qui velit. Fugiat reprehenderit laboris commodo aute aliquip. Excepteur aute esse incididunt excepteur veniam proident consectetur nisi nulla culpa. Culpa deserunt labore et quis ullamco esse ex proident aliqua officia fugiat exercitation sunt. Exercitation sit aliquip consectetur ea sunt mollit sit nostrud exercitation reprehenderit pariatur commodo. Eu officia officia aute velit ea et.\r\n",
          "createdBy": "Love Fisher",
          "updatedBy": "Odom Chambers",
          "lastUpdated": ""
        },
        {
          "index": 4,
          "incident": "INC5d92bbad4f6594200427d434",
          "app": "STREAMS",
          "name": "Amelia Hoover",
          "email": "ElisabethMann",
          "department": "GENMY",
          "typeOfAccess": "read",
          "approvedBy": "Barbara Gates",
          "approvedByITS": "Lakisha Jones",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Wed Feb 14 2018 06:57:20 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Mon Aug 19 2019 20:33:27 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Sit nostrud cupidatat esse fugiat commodo ipsum labore occaecat officia ad et occaecat officia. Sint commodo voluptate reprehenderit et velit qui do ea dolor. Sunt esse dolore ex cupidatat. Amet pariatur reprehenderit cillum dolor incididunt culpa cillum irure laboris. Culpa qui veniam velit anim adipisicing ea laborum consectetur Lorem non mollit voluptate ad. Et elit anim cupidatat aute veniam aliquip ea pariatur tempor cillum consequat anim. Pariatur proident officia consequat aliquip ut velit aliquip.\r\n",
          "createdBy": "Eddie Wilcox",
          "updatedBy": "Daugherty Burke",
          "lastUpdated": ""
        },
        {
          "index": 5,
          "incident": "INC5d92bbad59465ed18230d241",
          "app": "RAI",
          "name": "Loraine Fields",
          "email": "MillsFoster",
          "department": "PHARMACON",
          "typeOfAccess": "insert and update",
          "approvedBy": "Jody Middleton",
          "approvedByITS": "Keri Townsend",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Thu Sep 07 2017 18:17:48 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Sat Jun 01 2019 17:09:13 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Sunt irure sit ullamco velit veniam excepteur veniam. Occaecat ea nisi dolore Lorem velit. Commodo tempor eiusmod minim ea sit officia ipsum id commodo. Pariatur mollit adipisicing eu eiusmod nulla eu cillum laboris adipisicing sint reprehenderit esse deserunt cillum. Velit excepteur tempor enim culpa fugiat consectetur commodo excepteur cupidatat dolore aliquip qui veniam. Amet laboris aute laborum qui officia ex commodo. Aliqua irure sit officia non aliqua sit dolor cillum duis dolor.\r\n",
          "createdBy": "Rush Mcmahon",
          "updatedBy": "Debbie Cook",
          "lastUpdated": ""
        },
        {
          "index": 6,
          "incident": "INC5d92bbadc6f5c2045c3f3a34",
          "app": "RAI",
          "name": "May Camacho",
          "email": "WilderCarson",
          "department": "COMTRACT",
          "typeOfAccess": "insert and update",
          "approvedBy": "Vasquez Mcfarland",
          "approvedByITS": "Geraldine Haney",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Tue Sep 29 2015 17:41:36 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Sun Mar 08 2020 10:32:20 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Esse tempor voluptate dolore consectetur fugiat ut non voluptate. Mollit quis nostrud proident proident amet voluptate veniam sint ea. Commodo do dolore mollit duis consequat quis dolor laboris elit occaecat non. Mollit incididunt amet labore ipsum id in. Nisi est magna ex reprehenderit minim dolor. Ad nulla anim exercitation amet amet esse ea commodo duis velit sunt proident. Dolore proident sint dolore veniam consequat.\r\n",
          "createdBy": "Mccall Gomez",
          "updatedBy": "Shelia Benjamin",
          "lastUpdated": ""
        },
        {
          "index": 7,
          "incident": "INC5d92bbadff6b64222f704b93",
          "app": "SCATS",
          "name": "Carmela Morris",
          "email": "HodgesCochran",
          "department": "RODEOLOGY",
          "typeOfAccess": "insert and update",
          "approvedBy": "Krystal Bailey",
          "approvedByITS": "Margo Petty",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Wed Sep 14 2016 06:31:34 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Tue Apr 07 2020 06:52:17 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Qui amet nulla tempor adipisicing anim ipsum laborum. Et qui minim dolor veniam mollit dolore tempor id incididunt in. Qui elit occaecat adipisicing anim commodo aliqua in.\r\n",
          "createdBy": "Twila Wade",
          "updatedBy": "Stevens Dillard",
          "lastUpdated": ""
        },
        {
          "index": 8,
          "incident": "INC5d92bbad05fce4674786c471",
          "app": "SCATS",
          "name": "Sophie Cherry",
          "email": "SandyLowe",
          "department": "GENMOM",
          "typeOfAccess": "read",
          "approvedBy": "Ferrell Cote",
          "approvedByITS": "Terry Craig",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Fri May 30 2014 00:04:28 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Sun Dec 22 2019 16:38:28 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Minim ullamco exercitation tempor proident. Minim cupidatat consectetur deserunt nisi incididunt ipsum irure eu excepteur. Tempor consectetur exercitation qui culpa ad officia aute quis.\r\n",
          "createdBy": "Fanny Rivers",
          "updatedBy": "Lilly Carr",
          "lastUpdated": ""
        },
        {
          "index": 9,
          "incident": "INC5d92bbad2aa35629669fc779",
          "app": "RAI",
          "name": "Hannah Sutton",
          "email": "GreeneMercer",
          "department": "COMVEYER",
          "typeOfAccess": "insert and update",
          "approvedBy": "Witt Kidd",
          "approvedByITS": "Albert Durham",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Fri Nov 24 2017 21:32:26 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Fri Jan 10 2020 23:38:28 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Ea amet ea consequat eiusmod. Officia non cillum sunt incididunt qui sit deserunt minim. Laborum adipisicing aute elit sint pariatur labore do. Ea fugiat quis fugiat sunt labore esse fugiat excepteur labore qui quis. Proident velit minim cillum cillum veniam velit velit cillum deserunt culpa occaecat aute. Nostrud qui magna consequat eiusmod cupidatat commodo proident magna consequat.\r\n",
          "createdBy": "Kathrine Joyce",
          "updatedBy": "Marva Willis",
          "lastUpdated": ""
        },
        {
          "index": 10,
          "incident": "INC5d92bbad4297f9fe0c9bc057",
          "app": "STREAMS",
          "name": "Cheri Walter",
          "email": "TuckerRyan",
          "department": "CORECOM",
          "typeOfAccess": "read",
          "approvedBy": "Gladys Golden",
          "approvedByITS": "Helen Riggs",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sat Aug 02 2014 16:39:06 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Thu Feb 20 2020 14:48:48 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Cupidatat eiusmod laboris labore sunt quis culpa deserunt veniam ut adipisicing. In officia esse ad mollit. Ad exercitation non veniam quis occaecat enim aliqua anim. Esse laborum aliquip est nisi veniam ea sint ex ipsum id ea magna.\r\n",
          "createdBy": "Amparo Weiss",
          "updatedBy": "Blanca Eaton",
          "lastUpdated": ""
        },
        {
          "index": 11,
          "incident": "INC5d92bbadd8d2ddbe457e5763",
          "app": "STREAMS",
          "name": "Callahan Robertson",
          "email": "McknightKeller",
          "department": "ISOTERNIA",
          "typeOfAccess": "insert and update",
          "approvedBy": "Amalia Decker",
          "approvedByITS": "Hopkins Macdonald",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sat Jun 01 2019 19:24:45 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Tue Jul 16 2019 02:28:25 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Enim laboris laborum ea id deserunt ea laboris in deserunt voluptate do fugiat. Esse consequat laboris aliqua voluptate fugiat consequat do quis irure culpa eu sint dolor. Ullamco ipsum et dolor excepteur consectetur.\r\n",
          "createdBy": "Gay Barber",
          "updatedBy": "Felicia Gray",
          "lastUpdated": ""
        },
        {
          "index": 12,
          "incident": "INC5d92bbad3248a4800791b622",
          "app": "RAI",
          "name": "Lola Wilder",
          "email": "VickyReynolds",
          "department": "GEEKMOSIS",
          "typeOfAccess": "read",
          "approvedBy": "Bernard James",
          "approvedByITS": "Molly Warren",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun Dec 30 2018 08:31:34 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Wed May 06 2020 13:43:13 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Amet cupidatat duis ad occaecat aute labore aute laboris deserunt esse sunt aliqua occaecat voluptate. Aliqua voluptate ad minim duis irure deserunt adipisicing consequat enim sit culpa commodo. Voluptate adipisicing veniam sunt sit. Nulla non dolor ex ut consequat sit cillum enim.\r\n",
          "createdBy": "Blair Myers",
          "updatedBy": "Young Watts",
          "lastUpdated": ""
        },
        {
          "index": 13,
          "incident": "INC5d92bbadf5f618b66042a317",
          "app": "SCATS",
          "name": "Holman Pitts",
          "email": "BurkeDowns",
          "department": "DENTREX",
          "typeOfAccess": "read",
          "approvedBy": "Kidd Ramirez",
          "approvedByITS": "Larsen Parker",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun Jan 03 2016 12:50:13 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Fri Jul 26 2019 17:30:09 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Quis eiusmod aliquip pariatur dolore dolore consequat nostrud exercitation. Cillum nostrud minim ullamco ullamco quis consectetur et. In ipsum ullamco sunt enim aliqua id et nisi velit magna ullamco. Nisi eiusmod velit irure sint. Cupidatat amet sint nisi dolore. Cupidatat incididunt cupidatat ullamco qui aute exercitation laboris. Do proident sint ex ad fugiat minim Lorem aliqua deserunt commodo labore.\r\n",
          "createdBy": "Graham Vega",
          "updatedBy": "Cobb Shannon",
          "lastUpdated": ""
        },
        {
          "index": 14,
          "incident": "INC5d92bbad1b9b0f15f3b171f0",
          "app": "STREAMS",
          "name": "Mendoza England",
          "email": "MarilynAcosta",
          "department": "LYRICHORD",
          "typeOfAccess": "read",
          "approvedBy": "Rowe Goff",
          "approvedByITS": "Abbott Shelton",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Thu Apr 30 2015 14:14:03 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Tue Sep 03 2019 21:22:26 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Pariatur in dolore mollit esse duis incididunt anim enim nisi irure est. Tempor duis dolor consequat officia velit eiusmod eiusmod. Excepteur fugiat et consequat laborum labore dolore ad.\r\n",
          "createdBy": "Wallace Holden",
          "updatedBy": "White Ramsey",
          "lastUpdated": ""
        },
        {
          "index": 15,
          "incident": "INC5d92bbadf3703b10c7fd2f82",
          "app": "STREAMS",
          "name": "Moore Mcguire",
          "email": "WhitneyPadilla",
          "department": "AVIT",
          "typeOfAccess": "read",
          "approvedBy": "Rogers Holloway",
          "approvedByITS": "Holden Cummings",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Fri May 18 2018 00:59:02 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Tue Mar 03 2020 00:12:34 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Est amet ex occaecat id enim mollit ipsum ad fugiat cupidatat quis officia nulla. Excepteur eiusmod elit proident nisi sit officia mollit ex amet do consectetur sunt. Laboris sunt velit mollit sunt cillum sit consectetur in nostrud velit aliquip magna id pariatur. Nisi minim sunt occaecat fugiat ad esse exercitation nostrud laboris nisi nostrud labore ea. Esse eu culpa irure ullamco ullamco est enim qui in consectetur labore.\r\n",
          "createdBy": "Chambers Rhodes",
          "updatedBy": "Lorena Stein",
          "lastUpdated": ""
        },
        {
          "index": 16,
          "incident": "INC5d92bbadb5993ce24abaa27c",
          "app": "RAI",
          "name": "Mcdonald Ayala",
          "email": "MarisaGuy",
          "department": "TEMORAK",
          "typeOfAccess": "insert and update",
          "approvedBy": "Allie Ochoa",
          "approvedByITS": "Richard Hunt",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Wed Oct 07 2015 09:30:35 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Wed Jan 08 2020 15:45:46 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Amet commodo quis eiusmod ad aliquip velit dolore laboris enim et. Voluptate do nostrud ut in deserunt pariatur cupidatat ea. Irure aliqua officia magna nulla voluptate proident anim.\r\n",
          "createdBy": "Francine Sandoval",
          "updatedBy": "Keller Velasquez",
          "lastUpdated": ""
        },
        {
          "index": 17,
          "incident": "INC5d92bbad2f6b46207c54756b",
          "app": "SCATS",
          "name": "Misty Patterson",
          "email": "TrishaCastro",
          "department": "FOSSIEL",
          "typeOfAccess": "insert and update",
          "approvedBy": "Robbins Collier",
          "approvedByITS": "Joyce Walters",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun Mar 19 2017 13:59:06 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Tue Mar 10 2020 12:37:57 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Sunt elit elit enim enim esse labore ex laboris nisi laboris ut. Tempor deserunt proident sunt tempor aliquip irure nulla amet nostrud in excepteur. Anim qui excepteur sunt non irure ut exercitation nulla ea commodo mollit adipisicing fugiat. Cupidatat velit ea minim tempor Lorem culpa. Nisi ea minim laboris et id incididunt nisi tempor exercitation occaecat eu cupidatat dolor dolor.\r\n",
          "createdBy": "Ericka Walsh",
          "updatedBy": "Leanna Herrera",
          "lastUpdated": ""
        },
        {
          "index": 18,
          "incident": "INC5d92bbad04084a8616afb3a0",
          "app": "SCATS",
          "name": "Underwood Bowen",
          "email": "KathyRamos",
          "department": "WARETEL",
          "typeOfAccess": "read",
          "approvedBy": "Carroll Melton",
          "approvedByITS": "Flowers Pearson",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Thu Jan 12 2017 07:42:31 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Mon Feb 17 2020 20:26:20 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Cupidatat proident occaecat officia ipsum do aliqua laboris et est quis ea reprehenderit non. Reprehenderit enim minim dolore quis aliquip esse velit eu anim dolor dolor commodo. Sit magna cillum minim aliquip eu consectetur anim non et.\r\n",
          "createdBy": "Johanna Russell",
          "updatedBy": "Ferguson Morin",
          "lastUpdated": ""
        },
        {
          "index": 19,
          "incident": "INC5d92bbad873f2f886b959e80",
          "app": "SCATS",
          "name": "Monroe Pruitt",
          "email": "StephensonMorton",
          "department": "SPLINX",
          "typeOfAccess": "read",
          "approvedBy": "Dalton Talley",
          "approvedByITS": "Rodriquez Juarez",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Tue Apr 18 2017 11:25:06 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Sat Apr 25 2020 02:51:31 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Enim veniam pariatur exercitation adipisicing ipsum. Ea reprehenderit nulla est est. Mollit cillum deserunt tempor cupidatat. Aute cillum aute irure sunt occaecat elit.\r\n",
          "createdBy": "Berg Ferguson",
          "updatedBy": "Dena Wood",
          "lastUpdated": ""
        },
        {
          "index": 20,
          "incident": "INC5d92bbad037b8f7e2a0add10",
          "app": "SCATS",
          "name": "Rosie Fulton",
          "email": "AllisonGallegos",
          "department": "OPTICON",
          "typeOfAccess": "read",
          "approvedBy": "Bernadine Best",
          "approvedByITS": "Lillie Mcknight",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun Apr 15 2018 10:55:39 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Sun Jun 30 2019 20:52:04 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Proident ut eiusmod nostrud velit nostrud quis sit reprehenderit dolore ad labore voluptate veniam. Labore proident sunt Lorem eiusmod ipsum duis amet anim. Duis enim sint laborum incididunt dolore magna elit. Eu non dolor nulla elit cupidatat elit anim velit voluptate duis minim.\r\n",
          "createdBy": "Penny Chan",
          "updatedBy": "Camille Mclaughlin",
          "lastUpdated": ""
        },
        {
          "index": 21,
          "incident": "INC5d92bbad8a7cbe13ce35f441",
          "app": "RAI",
          "name": "Harrell Campos",
          "email": "BeanCastillo",
          "department": "TERRAGEN",
          "typeOfAccess": "insert and update",
          "approvedBy": "Natalie Barry",
          "approvedByITS": "Vargas Pugh",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Thu Sep 01 2016 13:44:43 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Mon Aug 12 2019 11:46:55 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Laborum laboris veniam deserunt sit dolor dolore non reprehenderit nostrud qui officia. Elit laboris nulla voluptate quis amet ut consectetur cillum nulla tempor. Nisi officia adipisicing sit sint. Occaecat consequat Lorem labore dolore sit Lorem ut. Qui ullamco veniam fugiat officia ea adipisicing est anim sint consequat amet eiusmod fugiat incididunt. Consectetur eu id consequat incididunt elit velit. Velit cillum amet ea ullamco aute consequat enim ipsum est commodo sint excepteur dolor pariatur.\r\n",
          "createdBy": "Langley Buckley",
          "updatedBy": "Stewart White",
          "lastUpdated": ""
        },
        {
          "index": 22,
          "incident": "INC5d92bbad35ea943156ef2c47",
          "app": "RAI",
          "name": "Turner Rosa",
          "email": "CalderonLyons",
          "department": "VENOFLEX",
          "typeOfAccess": "read",
          "approvedBy": "Marlene Obrien",
          "approvedByITS": "Concepcion Key",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun Nov 26 2017 16:01:31 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Sat Oct 19 2019 07:21:02 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Reprehenderit mollit labore sint anim proident id. Elit irure voluptate nostrud culpa duis adipisicing minim quis. Pariatur elit ex esse duis consectetur officia ea aliqua exercitation esse ut incididunt officia cillum. Pariatur duis consequat sunt eu id sit mollit. Enim consectetur qui in aute tempor anim tempor Lorem.\r\n",
          "createdBy": "Inez Powers",
          "updatedBy": "Snow Miles",
          "lastUpdated": ""
        },
        {
          "index": 23,
          "incident": "INC5d92bbada7055418179a84fc",
          "app": "STREAMS",
          "name": "Angelia Kent",
          "email": "CelinaAndrews",
          "department": "EVENTIX",
          "typeOfAccess": "read",
          "approvedBy": "Simpson Burt",
          "approvedByITS": "Wilkerson Gibson",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Sun May 19 2019 02:28:26 GMT+1000 (Australian Eastern Standard Time)",
          "accessEndDate": "Wed Jan 01 2020 02:14:15 GMT+1100 (Australian Eastern Daylight Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Anim qui id occaecat amet minim dolore exercitation. Commodo minim cupidatat duis proident veniam. Dolore do ullamco veniam proident non eu mollit incididunt laborum dolore.\r\n",
          "createdBy": "Velazquez Bird",
          "updatedBy": "Bridgette Nguyen",
          "lastUpdated": ""
        },
        {
          "index": 24,
          "incident": "INC5d92bbad8f56793092fd7518",
          "app": "STREAMS",
          "name": "Kerri Harrell",
          "email": "ReeseStephenson",
          "department": "KEGULAR",
          "typeOfAccess": "read",
          "approvedBy": "Hurst Pacheco",
          "approvedByITS": "Keith Bartlett",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Wed Nov 23 2016 15:42:40 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Wed Sep 04 2019 16:29:24 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": true,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Esse eiusmod dolor magna commodo velit nostrud et eiusmod proident proident commodo esse. Et magna sit pariatur laborum officia eu esse labore eiusmod esse eiusmod. Magna mollit fugiat anim mollit sint ad non ad. Sit culpa veniam mollit nulla ad elit ex anim. Culpa esse sunt officia incididunt sint adipisicing est sunt. Aliquip consectetur irure commodo proident irure labore fugiat.\r\n",
          "createdBy": "Gena Thompson",
          "updatedBy": "Padilla Baird",
          "lastUpdated": ""
        },
        {
          "index": 25,
          "incident": "INC5d92bbad22c9739330be71db",
          "app": "RAI",
          "name": "Medina Zimmerman",
          "email": "DeloresFrench",
          "department": "CHILLIUM",
          "typeOfAccess": "insert and update",
          "approvedBy": "Rochelle Goodwin",
          "approvedByITS": "Nona Sanford",
          "requestedDate": "Sat Feb 01 2014 00:00:00 GMT+1100 (Australian Eastern Daylight Time)",
          "accessStartDate": "Tue Dec 01 2015 07:44:13 GMT+1100 (Australian Eastern Daylight Time)",
          "accessEndDate": "Mon Jun 15 2020 17:04:19 GMT+1000 (Australian Eastern Standard Time)",
          "isOngoingAccess": false,
          "disabledDate": null,
          "extensionDate": null,
          "comment": "Eu sint anim officia enim fugiat. Mollit do sit duis qui fugiat mollit. Nostrud ut esse commodo eu voluptate sunt non non culpa. Id sunt reprehenderit id minim anim ut id est ut. Laboris aute amet reprehenderit esse enim exercitation eu nostrud laborum. Non nisi nostrud non deserunt minim enim laboris est. In duis minim minim occaecat laborum consectetur irure qui.\r\n",
          "createdBy": "Berta Peters",
          "updatedBy": "Lora Wilkerson",
          "lastUpdated": ""
        }
      ]
    }
    this.actionHandler = this.actionHandler.bind(this)
  }


  getDateColor(endDate) {
    let today = new Date()
    let color = ''
    color = compareAsc(endDate, today) <= 0 ? 'table-danger' : 'table-primary'
    return color
  }

  actionHandler(e, index) {
    e.persist()
    let valueHandler = e.target.value


    for (let [i, item] of this.state.data.entries()) {
      if (item.index === index) {
        let items = [...this.state.data]
        let item = items[i]

        if (valueHandler === 'extend') {
          item.extensionDate = new Date()
        }
        else if (valueHandler === 'disable') {
          item.disabledDate = new Date()
        }


        this.setState({
          data: items
        })

        break
      }
    }

  }

  getTable(data) {
    return (
      <>
        <thead>
          <tr>
            <th>
              Incident
          </th>

            <th>
              User Name
          </th>
            <th>
              Email
          </th>
            <th>
              Department
          </th>
            <th>
              Access Type
          </th>
            <th>
              Approved By
          </th>
            <th>
              Approved By ITS
          </th>
            <th>
              Requested Date
          </th>
            <th>
              Access Start Date
          </th>
            <th>
              Access End Date
          </th>
            <th>
              Access Extension Date
          </th>
            <th>
              Access Disable Date
          </th>
            <th>
              Actions
          </th>

          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            let endDate = new Date(item.accessEndDate)


            return <tr key={item.index}>
              <td>{item.incident}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.department}</td>
              <td>{item.typeOfAccess}</td>
              <td>{item.approvedBy}</td>
              <td>{item.approvedByITS}</td>
              <td>{format(new Date(item.requestedDate), 'dd/MM/yyyy')}</td>
              <td>{format(new Date(item.accessStartDate), 'dd/MM/yyyy')}</td>
              <td className={item.isOngoingAccess ? 'table-success' : this.getDateColor(endDate)}>{!item.isOngoingAccess ? format(endDate, 'dd/MM/yyyy') : 'ongoing'}</td>
              <td>{item.extensionDate !== null && format(new Date(item.extensionDate), 'dd/MM/yyyy')}</td>
              <td>{item.disabledDate !== null && format(new Date(item.disabledDate), 'dd/MM/yyyy')}</td>

              <td>
                <Button onClick={(e) => this.actionHandler(e, item.index)} value='extend'>Extend</Button>
                <Button onClick={(e) => this.actionHandler(e, item.index)} variant='danger' value='disable'>Disable</Button>
                <Button variant='info' value='edit'>Edit</Button>
              </td>
            </tr>
          })}
        </tbody>
      </>

    )
  }


  render() {
    return (
      <>
        <Create />
        <Table>

          {this.getTable(this.state.data)}

        </Table>
      </>
    )
  }
}

export default App;
