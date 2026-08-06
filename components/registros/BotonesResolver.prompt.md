Par ✓ / ✕ para cerrar una persona en seguimiento (se concretó / no se concretó).

```jsx
<BotonesResolver onSi={() => resolver(id,'si')} onNo={() => resolver(id,'no')} />
```

- El estado se guarda en el instante del tap; la captura de motivo/monto es opcional y nunca bloquea. Deshacer 5s revierte todo.
- El flujo termina aquí: atendido → seguimiento → ✓/✕. No somos CRM, no hay estados post-handoff.
