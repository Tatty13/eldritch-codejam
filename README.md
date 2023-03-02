# Eldritch Horror (Codejam)

## Project description
A small helper application for the Eldritch Horror board game. This task is a part of RS School's JS/Frontend-Stage-0 course.

## Task:
     - create a complex deck mixing algorithm

## Synopsis and algorithm conditions
Many board game fans have heard of the Eldritch Horror as one of the most interesting board adventures, but there is one difficulty: preparation for the game for inexperienced players takes from 40 minutes to an hour of time, and one of the most difficult conditions is compiling a deck of myths.

There are three card types in the Mythos deck: blue, brown, and green (the type is determined by the card header color).
There are also different ```card difficulty``` levels:
1. ```difficult cards``` have tentacles around the name (see the blue card below in the example)
2. ```standard cards``` don't have any signs (see the brown card in the example)
3. ```easy cards``` have snowflakes around the name (see the green card in the example)

Card examples:

![Blue card](https://github.com/Luffi2539/eldritch-codejam/blob/main/assets/MythicCards/blue/blue2.png?raw=true)
![Brown card](https://github.com/Luffi2539/eldritch-codejam/blob/main/assets/MythicCards/brown/brown1.png?raw=true)
![Green card](https://github.com/Luffi2539/eldritch-codejam/blob/main/assets/MythicCards/green/green1.png?raw=true)


In the first step, the player will need to choose an Eldritch One. It will indicate the deck layout and how many cards of what color are needed at each game stage.

An example of an Eldritch card:

![Древний](https://user-images.githubusercontent.com/43149261/172723651-a9c7e003-96b7-44e4-944a-54ad12755fbd.png)

The required card composition is calculated by the sum of cards of different colors for all 3 stages.
Based on the example, you will need:
* Green cards: 5
* Blue cards: 2
* Brown cards: 9

Next, the player will need to determine the ```game difficulty```:
* ```Very easy```: all cards with snowflakes are taken from the deck, if there are not enough cards, then standard cards are taken
* ```Easy``` cards with tentacles are removed from the deck
* ```Medium``` deck remains intact
* ```High``` cards with snowflakes are removed from the deck
* ```Very high``` all cards with tentacles are taken from the deck, if there are not enough cards, then standard cards are taken

Based on the example: We chose a ```very easy``` difficulty level and we need 9 brown cards, but there are only 5 easy brown cards with a snowflake in the set. So we take these five cards and 4 random standard cards.

Once the required number of cards is accumulated, we should create minidecks for each stage: 

1. Make three minideck with green, blue and brown cards (each color separately). Shuffle each minideck.
2. Сhoose the required number of cards from minidecks for each stage. Shuffle cards for each stage.

Based on the example:

For Stage 1 according to the scheme, we need 1 green, 2 brown and 1 blue card.
We randomly select 1 card from the mini deck of selected green cards, 2 cards from the brown deck and 1 from the blue deck. Then we shuffle the resulting 4 cards.

We repeat this action for the second and third stages. As a result, we will have 3 mixed minidecks for each stage.

Then the minidecks should be stacked so that the first stage cards are at the deck top, the second stage cards are in the middle, and the third stage cards are at the bottom of the deck.

Clipping from the game rules about building decks (this clipping does not include the division into difficulty levels, so the algorithm is slightly different:
![image](https://user-images.githubusercontent.com/43149261/172725219-0d0c9f22-0594-4b4b-9a2b-ce4427c682ab.png)

## Working files
There are 2 folders in the [main](https://github.com/Tatty13/eldritch-codejam/tree/main) branch of this repository, which contain useful files and images to complete the task.

The task is completed in the [eldrich](https://github.com/Tatty13/eldritch-codejam/tree/eldritch/eldrich) branch.


---

## Functionality
* There are 4 Eldritch cards to choose from
* There are 5 difficulty levels to choose from
* Cards are shuffled according to the game rules
* There is a tracker of the current deck state


## **Stack**

* HTML5
* CSS3
  * Flexbox layout
* JavaScript (ES6)
* Webpack (5)
* Git

---

---

[Deploy](https://tatty13.github.io/eldritch-codejam/eldrich/)

---

---

# Древний Ужас (Код-джем)

## Описание проекта
CodeJam в рамках курса JS/Frontend-Stage-0 от RS School, в результате которого создано небольшое приложение-хелпер для настольной игры "Древний Ужас".

## Задание:
     - создать сложный алгоритм замешивания колоды

## Синопсис и условия алгоритма
Многие любители настольных игр слышали про Древний ужас как одно из интереснейших настольных приключений, однако есть одна сложность: подготовка к игре для неопытных игроков занимает от 40 минут до часа времени, и одно из самых сложных условий - это составление колоды мифов.

Для сборки колоды мифов используется три разных типа карт: синие, коричневые и зеленые (тип определяется по цвету полосы в шапке карты).
Кроме того, есть разная сложность карт:
1. сложные карты имеют щупальцы вокруг названия
2. обычные карты не умеют никаких знаков
3. легкие карты имеют изображение снежинок вокруг названия

На первом этапе игроку будет необходимо выбрать Древнего, который укажет схему колоды и сколько карт какого цвета необходимо на каждом этапе игры.

Состав карт, необходимый для игры, считается по сумме карт разных цветов на все 3 этапа.
Исходя из примера понадобится:
* Зеленых карт: 5
* Синих карт: 2
* Коричневых карт: 9

Далее необходимо определить **сложность игры**:

Из общего набора карт необходимо выбрать карты согласно выбранной сложности:

* **Очень легкий** уровень сложности: из набора берутся все карты со снежинками, если карт не хватает, то добираются обычные карты
* **Легкий** уровень сложности: из набора убираются карты с щупальцами
* **Средний** уровень сложности: набор остается нетронутым
* **Высокий** уровень сложности: из набора убираются карты со снежинками
* **Очень высокий** уровень сложности: из набора берутся все карты со щупальцами, если карт не хватает, то добираются обычные карты

Исходя из примера: Мы выбрали очень легкий уровень сложности и нам необходимо 9 коричневых карт, но всего во всем наборе только 5 коричневых карт со снежинкой, значит, мы берем эти пять карт и дальше случайным образом выбираем 4 карты обычной сложности.

После того как необходимое количество карт набрано, мы должны создать миниколоды для каждого этапа.
Для этого отобранные карты перемешиваются отдельно (должно получиться три маленькие колоды, в которых будут расположены зеленые, синие и коричневые карты соответственно в случайном порядке).

Затем необходимо из этих колод выбрать необходимое количество карт для каждого этапа:
Исходя из примера:

Для Этапа 1 согласно схеме нам необходимы 1 зеленая, 2 коричневые и 1 синяя карта.
Мы случайным образом выбираем 1 карту из миниколоды отобранных зеленых карт, 2 карты из коричневой колоды и 1 из синей, после чего полученные 4 карты перемешиваем.

Повторяем данное действие для второго и третьего этапа. В результате колоды изначально перемешанные по цветам превратятся в 3 колоды каждого из этапов.

Далее колоды необходимо положить друг на друга, чтобы карты из первого этапа входили в игру первыми, потом шли карты второго этапа и под конец карты третьего этапа.

## Файлы для работы
В ветке main данного репозитория можно найти 2 папки assets и data, которые содержат полезные файлы и изображения для выполнения задания.
Само задание выполнено в ветке [eldrich](https://github.com/Tatty13/eldritch-codejam/tree/eldritch/eldrich).

---

## Реализованная функциональность
* На выбор предоставляется 4 карты древнего
* На выбор предоставляется 5 уровней сложности
* Карты замешиваются согласно правилам игры
* Есть трекер текущего состояния колоды

## **Стек**

* HTML5
* CSS3
  * Flexbox layout
* JavaScript (ES6)
* Webpack (5)
* Git

---
