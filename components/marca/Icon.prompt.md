Los 25 glifos oficiales de intra hotelero, copiados 1:1 del set del producto. Es el ÚNICO sistema de iconos: no se dibujan glifos nuevos ni se mezclan librerías.

```jsx
<Icon name="agenda" size={18} />
<Icon name="whatsapp" size={14} />           // solo dentro de BotonAtender
<Icon name="prod-cama" size={16} color="var(--ts)" />
```

- Set de navegación: `inicio` `personas` `agenda` `preguntar` `productos` `historial` `soporte` `descargar` `check-circle`.
- Set de tema: `amanecer` `atardecer` `noche`.
- Set del catálogo (12, asignables a un producto): `prod-cama` `prod-copa` `prod-sol` `prod-boda` `prod-pastel` `prod-charola` `prod-cubiertos` `prod-fiesta` `prod-maleta` `prod-podio` `prod-premio` `prod-presentacion`.
- Casi todos son fill (`fill: currentColor`); `descargar` y `soporte` son stroke 1.8 sobre grid 24. 18px en nav, 21px en tab bar, 14px en el botón Atender.
- Ícono solo (sin label) nunca carga significado: "señal nunca sólo-color/ícono".
