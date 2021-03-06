# MosaikJS

_MosaikJS, automatic mosaic builder_

Arranging images in a dynamic animated mosaic for a liquid container or a fixed size container.

See [http://kevin-wenger.ch/sideproject/mosaikjs](http://kevin-wenger.ch/sideproject/mosaikjs) for complete docs and demos.

## Install

A packaged source file includes everything you need to use MosaikJS.

+ [mosaikjs.min.js](http://kevin-wenger.ch/sideproject/mosaikjs/dist/mosaikjs.min.js)
+ [mosaikjs.css](http://kevin-wenger.ch/sideproject/mosaikjs/dist/mosaikjs.css)

(comming soon) If you are cool with the command line...

Install with [Bower](http://bower.io): `bower install mosaikjs`

## Initialize

### In JavaScript

``` js
$('#mosaic').mosaikJS();
```

### In HTML

``` html
<div id="mosaic">
    <div class="mosaikjs-bg-project"></div>
    <div class="mosaikjs-wrapper">
        <div class="mosaikjs-list-boxes">

            ...

            <div class="case">
                <div class="case-img-container" data-cover="img/covers/sea.jpg" data-img="img/covers/sea-small.jpg"></div>
                <div class="case-infos">
                    <p class="info-title">Beyond the oceans</p>
                    <p class="info-bs">John williams' album</p>
                </div>
            </div>

            ...

        </div>
    </div>
</div>
```

## License

For commercial projects and applications, non-commercial, personal, or open source projects and applications, you may use MosaikJS under the terms of the [GPL v3 License](http://choosealicense.com/licenses/gpl-v3/). You may use MosaikJS for free.

* * *

By [Kevin Wenger](http://kevin-wenger.ch)

- [Github](http://github.com/Sudei)
- [Bitbucket](https://bitbucket.org/WengerK)
