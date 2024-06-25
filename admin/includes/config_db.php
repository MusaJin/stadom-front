<?php
function getSchema()
{
    return [

        'category' => [
            'menuName' => 'Категория для документов',
            'fields' => [
                'title' => [
                    'name' => 'Название категории',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
            ],
        ],

        'docs' => [
            'menuName' => 'Документы',
            'fields' => [
                'category' => [
                    'name' => 'Выбор категории',
                    'element' => 'input',
                    'type' => 'hidden',
                    'data' => 'category',
                    'selectOne' => true,
                    'required' => true,
                ],
                'title' => [
                    'name' => 'Название',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'img' => [
                    'name' => 'Картинка',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],

            ],
        ],

        'categoryanticorr' => [
            'menuName' => 'Категория для противодействия коррупции',
            'fields' => [
                'title' => [
                    'name' => 'Название категории',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
            ],
        ],

        'anticorr' => [
            'menuName' => 'Против коррупции',
            'fields' => [
                'category' => [
                    'name' => 'Выбор категории',
                    'element' => 'input',
                    'type' => 'hidden',
                    'data' => 'categoryanticorr',
                    'selectOne' => true,
                    'required' => true,
                ],
                'title' => [
                    'name' => 'Название',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'img' => [
                    'name' => 'Картинка',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
            ],
        ],

        'news' => [
            'menuName' => 'Новости',
            'fields' => [
                'title' => [
                    'name' => 'Наименование',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'date' => [
                    'name' => 'Дата публикации',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'text' => [
                    'name' => 'Описание',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => true,
                ],
                'img' => [
                    'name' => 'Картинка',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
                'src' => [
                    'name' => 'Ссылка на видео (если есть)',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => false,
                ],
                'titlevid' => [
                    'name' => 'Название видео',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => false,
                ],
                'datevid' => [
                    'name' => 'Дата публикации видео',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => false,
                ],
                'telegram' => [
                    'name' => 'Телеграм сервер',
                    'element' => 'input',
                    'type' => 'hidden',
                    'required' => false,
                ],
            ],
        ],

        'videoblog' => [
            'menuName' => 'Видеоблог',
            'fields' => [
                'title' => [
                    'name' => 'Название',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => true,
                ],
                'date' => [
                    'name' => 'Дата публикации',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => true,
                ],
                'src' => [
                    'name' => 'Ссылка',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => true,
                ],
            ],
        ],

        'resources' => [
            'menuName' => 'Ресурсы стардома',
            'fields' => [
                'title' => [
                    'name' => 'Название',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'subtitle' => [
                    'name' => 'Описание (если есть)',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => false,
                ],
                // 'text' => [
                //     'name' => 'Отзыв',
                //     'element' => 'textarea',
                //     'type' => 'text',
                //     'required' => true,
                // ],
                'img' => [
                    'name' => 'Картинка',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
            ],
        ],
        
        'statistics' => [
            'menuName' => 'Статистика',
            'fields' => [
                'title' => [
                    'name' => 'Числовой показатель',
                    'element' => 'input',
                    'type' => 'text',
                    'required' => true,
                ],
                'subtitle' => [
                    'name' => 'Описание',
                    'element' => 'textarea',
                    'type' => 'text',
                    'required' => false,
                ],
                'img' => [
                    'name' => 'Картинка',
                    'element' => 'input',
                    'type' => 'file',
                    'required' => true,
                ],
            ],
        ],

    ];
}
