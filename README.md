# README - Frontend

## Начало работы над проектом
В консоли выполнить `npm i webpack`

## Кодировка

Кодировка файлов - **utf-8**.

## Браузеры

Вёрстка должна корректно отображаться следующих браузерах:
- **Internet Explorer** (11 версия)
- **Mozilla Firefox** (две последние версии)
- **Google Chrome** (две последние версии)
- **Safari** (две последние версии)
- **Yandex.Браузер** (две последние версии)
- **Opera** (две последние версии)
- **Microsoft Edge** (две последние версии)

## Брейкпоинты

Основные брейкпоинты, для которых отрисовывались дизайн-макеты:
- **375px - 767px** - мобильные устройства
- **768px - 1279px** - планшеты
- **1280px - 1920px** - десктоп

## Общие правила

- Во всех файлах для задания отступов в коде используются 2 пробела.
- В файлах стилей и разметки используются двойные кавычки, в файлах скриптов - одинарные или обратные (кроме исключительных случаев).
- В конце каждого файла должна быть пустая строка.

## Структура проекта

### Исходники


Иконки, картинки и  исходники стилей лежат в директории `/src/`. Файлы из этой директории каким-либо образом будут обработаны сборщиком.

Директория `/src/` включает в себя следующие поддиректории:
```
fonts/ - содержит шрифты
html/ - Содержит файлы html
icons/ - содержит файлы с svg-иконками, которые затем собираются в шрифтовой спрайт
    svgs/
images/ - содержит файлы с различными картинками
js/ - содежит файлы JavaScript
scss/ - содержит исходники файлов со стилями, которые затем преобразуются в один общий файл стилей
    abstracts/
    base/
    blocks/
```

## Сборщик

На проекте используется сборщик **Webpack**.

Запускается сборщик из корня проекта.

Команды для сборки:
- `npm run start` - запуск слежения за файлами и локального сервера.
- `npm run build` - собирает проект для прода.

## БЭМ

Стили пишутся по методологии **БЭМ**, где:
`block-name` - блок,  
`block-name__element-name` - элемент,  
`block-name--modifier-name` - модификатор.

Внутри блока описывается внутреняя геометрия и стилизация. Для указания внешней геометрии (позиционирования, отступов и т.д.) испольузуются миксы.

Ни один блок не должен влиять на другие блоки и их элементы. Если необходимо выполнить дополнительную стилизацию блока, находящегося внутри другого, то так же используем микс.
``` html
<a class="link" title="Перейти">
    Скачать <i class="link__icon icon icon--arrow"></i>
</a>
```

``` scss
// Так нельзя
.link {
    .icon {
        color: $color-brand;
    }
}

// А вот так можно
.link {
    &__icon {
        color: $color-brand;
    }
}
```

В разметке при указании нескольких классов на БЭМ-узле сначала пишутся более уникальные классы, относящиеся к окнретной странице\блоку, затем - более универсальные базовые классы:
``` html
<header class="page__header header">
    <div class="header__container container">
        <div class="header__profile profile">
            <a href="#" class="profile__avatar"></a>

            <a href="#" class="header__link profile__text link link--simple">Войти</a>
        </>
    </div>
</header>
```

## Стили

### Препроцессор

Для написания стилей используется препроцессор **Sass** (синтаксис **scss**).

### Структура

Исходники стилей находятся в поддиректории `scss/`, структура данной поддиректории выглядит следующим образом:
```
abstracts/ - содержит "абстракции": функции, миксины, переменные, которые часто используются при стилизации различных блоков и страниц проекта
    _functions.scss - содержит описание основных функций
    _mixins.scss - содержит описание основных часто повторяющихся блоков кода (миксинов)
    _variables.scss - содержит описание основных переменных

base/ - содержит подключение шрифтов и базовую стилизацию тэгов
    _fonts.scss - содержит подключение шрифтов
    _generic.scss - содержит базовую стилизацию на тэги

blocks/ - содержит стилизацию компонентов (блоков)
    _block-name.scss - содержит стилизацию конкретного компонента

style.scss - главный файл, в который импортируются все остальные
```

Названия всех файлов начинается с нижнего подчёркивания. Имя файла в поддиректории `blocks/` должно быть таким же, как имя блока, для стилизации которого создан данный файл.

Все файлы подключаются вручную в `main.scss`, например:  
``` scss
@import "blocks/button";
```

Сначала в `main.scss` подключаются стили плагинов, после - базовые стили, а в завершение всего стили компонентов. При этом порядок подключения файлов компонентов должен быть следующим: сначала подключаются базовые блоки, затем более сложные составные блоки, после - блоки лэйаута, в завершении - блоки, описывающие уникальные блоки конкретных страниц.
``` scss
// vendors
@import "~plugin-name.scss";

// base
@import "base/fonts";
@import "base/generic";

// blocks
// base
@import "blocks/icon";
@import "blocks/icons";
@import "blocks/button";
@import "blocks/buttons";
@import "blocks/heading";

// form
@import "blocks/input";
@import "blocks/checkbox";
@import "blocks/form";

// middle and hard
@import "blocks/modal";
@import "blocks/slider";
@import "blocks/news";
@import "blocks/product";
@import "blocks/products";

// layouts
@import "blocks/container";
@import "blocks/header";
@import "blocks/content";
@import "blocks/footer";
@import "blocks/page";

// pages
@import "blocks/auth-page";
@import "blocks/goods";
@import "blocks/faq";

```

### Mobile-first или Desktop-first (по ситуации)

Описание стилей начинается со стилей для мобильных устройств, затем через медиа-запросы описываются стили для планшетов и десктопа.
(Либо наоборот)
``` scss
.sidebar {
    height: rem(100px);

    @media #{$screen-medium} {
        height: auto;
    }

    @media #{$screen-big} {
        position: absolute;
    }
}
```


### CSS-свойства

В файлах `scss` свойства объединяются по смыслу, порядок следования должен соответствовать [css-comb](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json). Каждая логическая группа свойств отделяется пустой строкой.

``` scss
.container {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 100%;
}
```

### Порядок описания стилей

``` scss
.container {
    // Сначала идут стили, описывающие сам блок
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    // Затем идут стили для медиазапросов
    @media #{$screen-medium} {
        position: static;
    }

    @media #{$screen-huge} {
        flex-direction: column;
    }

    // После - псевдоэлементы
    &::before {
        $size: 10px;

        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: rem($size);
        height: rem($size);

        content: "";

        background-color: $color-background;
    }

    // Далее - псевдоклассы
    &:hover {
        color: $brand-color;

        @media #{$screen-tablet} {
            color: $color-brand-secondary;
        }
    }

    // Затем - модификаторы блока
    &--small {
        width: 40%;
    }

    // И после всего - описание элементов, внутри которых сохраняется тот же порядок следования стилей
    &__box {
        width: 50%;
        padding-left: rem(15px);

        &--special {
            position: relative;

            width: 30%;
            padding-right: rem(10px);

            @media #{$screen-tablet} {
                width: 100%;
            }
        }

        &-title {
            font-weight: 700;

            margin-bottom: rem(10px);
        }
    }

    &__icon {
        display: inline-block;

        &:hover {
            transform: scale(1.5);
        }

        &-pic {
            font-size: rem(12px);
        }
    }
}
```

### Работа с часто используемыми переменными

Всё то, что часто используется при стилизации или какие-то значения, которые нужны сразу в нескольких разных компонентах, указываются в  файле `abstracts/_variables.css`.

**Цвета**

``` scss
// Переменные со статическими цветами
$white: #ffffff;
$black: #333333;
$mine-shaft: #383838;
$supernova: #ffc700;
...

// На основе переменных со статическими цветами созданы динамические цветовые переменные. 
$color-text: $black;
$color-text-inverse: $white;

$color-background: $white;
$color-background-light: $porcelain;

$color-brand: $outrageous-orange;
$color-brand-secondary: $pale-sky;
...
```

Если при стилизации блока нужно задать какой-то цвет, то сначала ищем динамическую переменную, соответствующую нужному цвету. Если такой не находится, то берем статическую переменную. И уже в крайних случаях, когда переменной с нужным цветом не найдено, используем цвет напрямую.
``` scss
// Сначала ищем динамические переменные
color: $color-brand;

// Если не найдено - статическую
border-color: $supernova;

// Крайний случай - указание напрямую
background-color: #f09083;
```

**Шрифты**

Пути к шрифтам, семейства, базовый шрифт для документа тоже описываем один раз в переменных, а затем используем в других файлах и компонентах.
``` scss
...
$font-path: "/assets/app/fonts/";
$font-family-default: "Arial", "Helvetica", sans-serif;
$font-family-custom: "Roboto";

$font-family: $font-family-custom, $font-family-default;
$font-size: 16px;
...
```

**Размер шрифта**

Для задания часто повторяющихся размеров шрифтов создаем соответствующие переменные. Для текста также есть готовые миксины.
Если для стилизации какого-либо компонента размеры шрифтов соответствуют тем, что есть в миксинах или переменных, то используем эти переменные\миксины. Если не находим - пишем значения напрямую.
``` scss
...
$font-weight-bold: 700;
$font-weight-regular: 400;

$font-size-huge: 30px;
$font-size-large: 24px;
$font-size-medium: 18px;
$font-size-normal: 16px;
$font-size-small: 14px;

$line-height-default: 1.7;
$line-height-normal: 1.4;
$line-height-small: 1.2;
...
```

``` scss
// Сначала ищем существующую переменную
.spoiler {
    font-size: rem($font-size-large);
}

// Если нужной переменной нет - задаем напрямую
.spoiler {
    font-size: rem(27px);
}
```

**Брейкпоинты**

Брейкпоинты тоже выносим в переменные. Практически для всех случаев используются переменные без суффикса `-only`, и только в особенных случая можно воспользоваться переменными с суффиксом `-only`.
``` scss
...
$screen-big: "(min-width: 1280px)";
$screen-medium: "(min-width: 768px)";

$screen-mobile-only: "(max-width: 767px)";
...
```

В компонентах не должно быть медиазапросов, которые в описании области их применения не используют заданные переменные:
``` scss
.content {
    padding-bottom: rem(40px);

    // Плохо
    @media (min-width: 680px) {
        border-bottom: rem(1px);
    }

    // Хорошо
    @media #{$screen-medium} {
        box-shadow: 0 0 rem(10px) rgba($black, .1);
    }

    @media #{$screen-big} {
        padding-top: rem(40px);
    }
}
```

**Размеры контейнеров, отступов и т.д.**

Нужно вынести в переменные значения размеров тех блоков, которые могут использоваться в разных компонентах.
``` scss
$window-width-tablet: 768px;
$window-width-mobile: 375px;

$container-width-tablet: 728px;
$container-horizontal-padding: 20px;

$input-height: 50px;
```

**Z-index**

Z-index различных блоков должны быть вынесены в файл с глобальными переменными. Так будет видна полная картина с z-слоями в рамках всего проекта.
Исключением являются случаи, когда z-index используется для реализации какой-то внутренней стилизации компонента, и он не влияет на общую картину, например:
``` scss
.card {
    position: relative;
    z-index: 1;

    &::after {
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        
        display: block;

        content: "";

        background-color: rgba($black, .3);
    }
}
```

### Стили документа

Базовые стили документа и стилизация на другие тэги (заголовки, параграфы, списки, ссылки и т.д) описываются в файле `_generic.scss`.
Здесь описываются базовые сбрасывающие стили или стили, которые будут применяться для отображения контента, заполняемого контент-менеджером в визуальном редакторе в админке сайта.
``` scss
* {
    box-sizing: border-box;
    
    -webkit-tap-highlight-color: transparent;

    &::before,
    &::after {
        box-sizing: border-box;
    }
}

html {
    font-family: $font-family;
    font-size: 100%;

    color: $color-text;
    background-color: $color-background;
}

body {
    $font-size: $font-size-medium;

    font-size: rem($font-size);
    font-weight: $font-weight-medium;
    line-height: ($line-height-medium / $font-size);

    text-rendering: optimizeLegibility;
}

...

h3 {
    @include text-large;

    margin-top: 0;
    margin-bottom: 0;

    &:not([class]) {
        margin-bottom: rem(10px);

        @include resetting-vertical-indentation-of-last;
    }
}

p {
    margin-top: 0;
    margin-bottom: 0;

    &:not([class]) {
        margin-bottom: rem(10px);

        @include resetting-vertical-indentation-of-last;
    }
}
...
```

### Относительные единицы измерения

Все абсолютные единицы измерения должны быть переведены в относительные (rem, % или коэффициенты).
Для этого используем функцию `rem()`, встроенную функцию `percentage()` и математические вычисления.

``` scss
.spoiler {
    $width: 600px;

    $font-size: $font-size-big;

    font-size: rem($font-size-big);
    line-height: (24px / $font-size);

    width: percentage($width / $container-width);
    margin-top: rem(15px);
    margin-bottom: rem(25px);

    border-bottom: rem(1px) solid;
    box-shadow: 0 0 rem(2px) rgba($killarney, .5);
}
```

### Избегаем magic number

В коде должно быть минимальное количество мест, в которых задаются непонятно откуда взятые цифры. Во многих местах должны использоваться или переменные, или должны быть показаны вычисления.
``` scss
// Плохо
.tooltip {
    line-height: 1.635;
}

.banner {
    width: 63.83768%;
}

.search {
    padding-right: rem(15px);
    padding-right: rem(45px);

    &__button {
        position: absolute;
        right: rem(15px);

        width: rem(15px);
    }
}

// Хорошо
.tooltip {
    $font-size: 13px;

    font-size: rem($font-size);
    line-height: ($font-size / $font-size);
}

.banner {
    $banner-width: 545px;

    width: percent($banner-width / $window-width);
}

.search {
    $padding: 15px;
    $button-size: 15px;

    padding-right: rem($padding);
    padding-right: rem(2 * $padding + $button-size);

    &__button {
        position: absolute;
        right: rem($padding);

        width: rem($button-size);
    }
}
```

### Избегаем дублирования имени блока при стилизации вложенных элементов

Имя блока должно встречаться в файле только один раз - в самом верху. Вся стилизация вложенных элементов производится за счет использования `&`.
``` scss
// Плохо
.table {
    &--grey {
        border-bottom: rem(1px) solid $dark;

        .table__row {
            background-color: $grey;
        }
    }

    &__thead {
        font-size: rem(20px);

        .table__col {
            padding: rem(10px);
        }
    }

    &__col {
        padding: rem(5px);
    }
}

// Хоршо
.table {
    &--grey {
        border-bottom: rem(1px) solid $dark;
    }
    &--grey & {
        &__row {
            background-color: $grey;
        }
    }

    &__thead {
        font-size: rem(20px);
    }
    &__thead & {
        &__col {
            padding: rem(10px);
        }
    }

    &__col {
        padding: rem(5px);
    }
}
```

## Иконки

Для иконок используется символьный спрайт (кроме специальных случаев). Исходники с иконками помещаются в поддиректорию `/assets/icons/svg/`. Каждая иконка - это отдельный svg-файл. Название файла должно отражать суть иконки и будет использоваться в качестве id.

Внутри кода иконки не должно быть жестко заданных цветов (опять же, кроме специальных случаев, когда какой-то элемент иконки должен быть всегда жёстко заданного цвета).

Суть использования иконок заключается в том, чтобы при стилизации можно было менять их размеры и цвета. Соответственно, для возможности указания цвета иконки в css внутри самой иконки нужно вручную или вообще полностью удалить `fill` или `stroke`, или вместо жёсткого кода цвета использовать переменную `currentColor`.

``` html
// burger.svg
<svg width="21" height="14" viewBox="0 0 21 14" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.839844" width="20" height="2" rx="1"/>
    <rect x="0.839844" y="6" width="20" height="2" rx="1"/>
    <rect x="0.839844" y="12" width="20" height="2" rx="1"/>
</svg>


// arrow.svg
<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L1 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

При добавлении новой иконки обязательно создаем для нее модификатор с базовой стилизацией в блоке `.icon`. Название модификатора должно соответствовать названию иконки:
``` scss
.icon {
    &--burger {
        width: rem(21px);
        height: rem(14px);
    }

    &--arrow {
        width: rem(6px);
        height: rem(10px);
    }
}
```

Для использования иконок в вёрстке используется похожий код:
``` html
<svg class="icon icon--arrow">
    <use xlink:href=""public/images/icons/sprite.svg#icon-arrow""></use>
</svg>
```

## Изображения

Картинки-заглушки или картинки-паттерны, которые не могут использоваться в виде спрайта, помещаются в директорию `/assets/images/`.
В данный моомент дополнительная обработка картинок сборщиком не реализована, но предполагается, что в дальнейшем при сборке проекта эти картинки должны будут быть оптимизированы.

## GUI

Вёрстка страницы сайта должна происходить по следующему сценарию:
- Анализ дизайн-макетов страницы.
- Разбиение интерфейса на маленькие универсальные блоки, из которых в дальнейшем можно будет как конструктор собирать как более большие и сложные блоки, так и сами страницы.
- Поиск необходимых блоков среди уже реализованных.
- Если необходимый блок или его модификация отсутствует - реализация данного блока с обязательным выносом разметки в файл GUI.
- Реализация страницы путём компоновки уже готовых базовых блоков и уникальных страничных блоков, которые нельзя будет переиспользовать где-то ещё, и их область применения ограничена рамками конкретной страницы.

Соответственно, все блоки, которые можно переиспользовать в рамках сайта, их модификации и состояния должны быть добавлены на страницу GUI.

GUI - это единая точка входа для все frontend-разработчиков, участвующих в реализации проекта. Это, во многом, нужно для того, чтобы избежать ситуаций, когда разработчик, не зная о существовании других страниц и нужных ему блоков, и вместо того, чтобы использовать уже готовый блок, создаёт свой новый. В результате появляются дублирующие друг друга блоки для одних и тех же компонентов вёрстки.
