El único protagonista negro de la pantalla. Nada más compite en valor.

```jsx
<Hero desktop valor="22" delta="22%" deltaVs="vs junio"
  nota={<>De <b>34 personas atendidas</b>, 22 se convirtieron en oportunidades reales.</>}>
  <Sparkline puntos={serie} rango="últimos 90 días" />
  <div style={{display:'flex',gap:8,marginTop:20}}>
    <ChipHero n={12} icon={<Icon name="prod-cama" size={13}/>}>Reservas</ChipHero>
  </div>
</Hero>
```

- El hero permanece oscuro en los 3 temas; solo `--hero-glow` cambia.
- `modo="cobrado"` para propiedades transaccionales: cifra 56px + MXN + "Dinero verificado — cobrado directo por el sistema", divisor, y las oportunidades como línea secundaria de 32px.
- Si el filtro deja el cobrado en $0, vuelve a `modo="oportunidades"`: nunca un $0 protagonista.
- Un solo hero por pantalla. Cifras display con `proportional-nums`; el resto del producto va tabular.
