type PointName = string
type CategoryName = string


const CategoryNames = new Map<PointName, CategoryName>([
  ['motherboards',  'Материнские платы'],
  ['processors',    'Процессоры'],
  ['memory',        'Оперативная память'],
  ['videocards',    'Видеокарты'],
  ['storages',      'Накопители SSD и HDD'],
  ['coolers',       'Системы охлаждения'],
  ['powersupplies', 'Блоки питания'],
  ['cases',         'Корпусы']
])




export { CategoryNames }
