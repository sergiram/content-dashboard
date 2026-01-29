# 📝 Ejercicios Diarios - 14 Días de React

## Semana 1: Fundamentos

### 📅 Día 1: Setup y Primer Componente (2-3h)
**Objetivo:** Entender la estructura de un proyecto React

✅ **Completar:**
1. Crear proyecto con Vite
2. Instalar Tailwind
3. Crear componente Button
4. Probar el Button en App.tsx

🎯 **Ejercicio Extra:**
- Crea un componente `Card.tsx` con:
  - Props: `title`, `description`
  - Fondo blanco, bordes redondeados, sombra
- Úsalo 3 veces en App.tsx con diferentes textos

💡 **Si te atascas:**
```tsx
// Pista para Card.tsx
interface CardProps {
  title: string;
  description: string;
}

export const Card = ({ title, description }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Tu código aquí */}
    </div>
  );
};
```

---

### 📅 Día 2: Estado y Dark Mode (2-3h)
**Objetivo:** Entender useState y manejo de estado

✅ **Completar:**
1. Crear Header con dark mode toggle
2. Entender useState
3. Probar dark mode funcionando

🎯 **Ejercicio Extra:**
- Crea un contador con botones +1 y -1
- El número debe cambiar al hacer click
- Usa `useState`

💡 **Pista:**
```tsx
const [count, setCount] = useState(0);
// onClick={() => setCount(count + 1)}
```

---

### 📅 Día 3: Tipos y Datos Mock (2h)
**Objetivo:** Dominar TypeScript básico

✅ **Completar:**
1. Crear tipos en `types/index.ts`
2. Crear datos mock en `data/videos.ts`
3. Entender interfaces

🎯 **Ejercicio Extra:**
- Agrega 3 videos más a mockVideos
- Crea un nuevo tipo `User` con:
  - name, email, role
- Crea array de 2 usuarios mock

---

### 📅 Día 4: Renderizado de Listas (2-3h)
**Objetivo:** Dominar map() y renderizado dinámico

✅ **Completar:**
1. Crear StatCard component
2. Calcular totales con reduce
3. Renderizar 3 StatCards

🎯 **Ejercicio Extra:**
- Crea componente `VideoCard.tsx` que muestre:
  - Título del video
  - Views (formateado: 1K, 1M)
  - Likes
- Renderiza TODOS los videos con map:
```tsx
{mockVideos.map(video => (
  <VideoCard key={video.id} video={video} />
))}
```

💡 **Importante:** Siempre usa `key` en map

---

### 📅 Día 5: Primer Gráfico (2-3h)
**Objetivo:** Integrar librería externa (Recharts)

✅ **Completar:**
1. Instalar recharts
2. Crear SimpleChart con BarChart
3. Ver datos visualizados

🎯 **Ejercicio Extra:**
- Cambia el BarChart por un LineChart
- Cambia el color de las barras/líneas
- Agrega un segundo Bar/Line para likes

💡 **Pista Recharts:**
```tsx
<Line dataKey="likes" stroke="#ef4444" />
```

---

### 📅 Día 6: Estado Global (2-3h)
**Objetivo:** Entender Zustand y estado compartido

✅ **Completar:**
1. Instalar zustand
2. Crear store básica
3. Migrar dark mode a Zustand

🎯 **Ejercicio Extra:**
- Agrega a la store:
  - `videos: Video[]` (con los mock videos)
  - `addVideo: (video) => void`
- Crea un botón que agregue un video nuevo
- Verifica que el contador de videos sube

---

### 📅 Día 7: Review y Refactor (2-3h)
**Objetivo:** Consolidar lo aprendido

✅ **Tareas:**
1. Revisar TODO el código escrito
2. Agregar comentarios explicativos
3. Arreglar warnings
4. Deploy en Vercel

🎯 **Checklist:**
- [ ] npm run build sin errores
- [ ] Dark mode funciona
- [ ] Gráfico se ve bien
- [ ] StatCards muestran datos correctos
- [ ] Código comentado

---

## Semana 2: Features Avanzadas

### 📅 Día 8: Filtros Básicos (2-3h)
**Objetivo:** Filtrar arrays dinámicamente

✅ **Completar:**
1. Agregar selector de categoría
2. Filtrar videos por categoría
3. Actualizar gráficos con videos filtrados

🎯 **Ejercicio:**
```tsx
// En la store
categoryFilter: 'all',
setCategoryFilter: (category) => set({ categoryFilter: category }),

// Computed value
getFilteredVideos: () => {
  const { videos, categoryFilter } = get();
  if (categoryFilter === 'all') return videos;
  return videos.filter(v => v.category === categoryFilter);
}
```

Agrega `category: string` a la interface Video

---

### 📅 Día 9: Tabla de Top Videos (2-3h)
**Objetivo:** Componentes de tabla

✅ **Crear:**
1. Componente `TopVideosTable.tsx`
2. Mostrar top 5 videos por views
3. Incluir thumbnail, título, views, likes

🎯 **Pista:**
```tsx
const topVideos = videos
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);
```

---

### 📅 Día 10: Más Gráficos (2-3h)
**Objetivo:** Diversidad de visualizaciones

✅ **Crear:**
1. LineChart de views en el tiempo
2. PieChart de videos por categoría
3. Grid de 2x2 con todos los gráficos

🎯 **Data para LineChart:**
```tsx
// Datos de ejemplo
const viewsOverTime = [
  { date: '2024-01-01', views: 1000 },
  { date: '2024-01-02', views: 1500 },
  // ...
];
```

---

### 📅 Día 11: Comparador (3h)
**Objetivo:** Feature compleja con selección

✅ **Crear:**
1. Selección de 2 videos (checkboxes)
2. Página/modal de comparación
3. Mostrar métricas lado a lado

🎯 **Store:**
```tsx
selectedVideos: [],
toggleVideoSelection: (id) => set((state) => {
  const selected = state.selectedVideos;
  if (selected.includes(id)) {
    return { selectedVideos: selected.filter(x => x !== id) };
  }
  if (selected.length >= 2) return state; // Max 2
  return { selectedVideos: [...selected, id] };
}),
```

---

### 📅 Día 12: Polish UI (2-3h)
**Objetivo:** Detalles que importan

✅ **Tareas:**
1. Animaciones con Tailwind
2. Loading states
3. Empty states ("No hay videos")
4. Hover effects
5. Responsive mobile

🎯 **Animaciones Tailwind:**
```tsx
className="transition-all duration-300 hover:scale-105"
```

---

### 📅 Día 13: Tests Básicos (2-3h)
**Objetivo:** Introducción a testing

✅ **Setup:**
```bash
npm install -D vitest @testing-library/react jsdom
```

✅ **Crear:**
1. Test de Button: "renderiza children"
2. Test de StatCard: "formatea números"
3. Test de store: "toggleDarkMode funciona"

💡 **Ejemplo:**
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

---

### 📅 Día 14: README y Deploy (2-3h)
**Objetivo:** Proyecto listo para portfolio

✅ **Completar:**
1. README.md con screenshots
2. Deploy en Vercel
3. Actualizar LinkedIn/CV
4. Preparar explicación para entrevistas

🎯 **README debe incluir:**
- Screenshot del dashboard
- Features principales
- Stack tecnológico
- Comandos para correr local
- Link al deploy
- Decisiones técnicas

---

## 🎯 Objetivos de Aprendizaje por Semana

### Semana 1:
- ✅ Pensar en componentes
- ✅ Props y tipos
- ✅ useState básico
- ✅ Renderizado de listas
- ✅ Integrar librerías
- ✅ Estado global básico

### Semana 2:
- ✅ Filtros y búsqueda
- ✅ Features complejas
- ✅ Computed values
- ✅ UI polish
- ✅ Testing básico
- ✅ Deploy

---

## 💪 Desafíos Extra (Si terminas antes)

### Nivel 1 (Fácil):
- [ ] Agregar animación al cambiar de dark mode
- [ ] Contador de videos publicados esta semana
- [ ] Botón para ordenar por diferentes campos

### Nivel 2 (Medio):
- [ ] Búsqueda de videos por título
- [ ] Exportar stats a JSON
- [ ] Gráfico de engagement rate

### Nivel 3 (Difícil):
- [ ] Drag & drop para reordenar videos
- [ ] Guardar datos en localStorage
- [ ] Agregar/editar videos (CRUD completo)

---

## 📊 Checklist Final

Antes de considerar el proyecto terminado:

**Funcionalidad:**
- [ ] Dark mode funciona
- [ ] Todos los gráficos se renderizan
- [ ] Filtros funcionan correctamente
- [ ] StatCards muestran datos correctos
- [ ] Responsive en móvil

**Código:**
- [ ] 0 errores TypeScript
- [ ] 0 warnings ESLint
- [ ] Código comentado
- [ ] Componentes reutilizables
- [ ] Store organizada

**Portfolio:**
- [ ] Deploy funcionando
- [ ] README completo con screenshots
- [ ] Código en GitHub
- [ ] Link en LinkedIn/CV

**Preparación entrevistas:**
- [ ] Sabes explicar cada decisión técnica
- [ ] Puedes explicar useState vs Zustand
- [ ] Puedes explicar por qué elegiste X librería
- [ ] Tienes lista de mejoras futuras

---

## 🆘 Recursos de Ayuda

### Si te atascas:

1. **Lee el error completo** - TypeScript te dice qué falta
2. **Console.log es tu amigo** - Imprime variables para ver qué contienen
3. **React DevTools** - Extensión de Chrome para ver estado
4. **Google el error** - Stackoverflow tiene casi todo
5. **Pregunta en Discord de React** - La comunidad ayuda

### Comunidades:

- [r/reactjs](https://reddit.com/r/reactjs)
- [React Discord](https://discord.gg/reactiflux)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)

---

## 🎓 ¿Qué nivel tendrás después?

Si completas los 14 días:

**Junior React Developer** ✅
- Sabes crear componentes
- Manejas estado
- Integras librerías
- Usas TypeScript

**Listo para aplicar a:**
- Posiciones React Junior
- Posiciones Frontend Junior
- Proyectos freelance pequeños

**NO eres Senior, pero:**
- Tienes más conocimiento que bootcamps de 3 meses
- Tienes proyecto real en portfolio
- Sabes suficiente para aprender el resto en el trabajo

---

## ✨ Motivación Final

**2 semanas parece poco, pero:**
- Muchos devs aprenden menos en cursos de 6 meses
- La clave es PRACTICAR, no ver videos
- Cada línea que escribes es aprendizaje

**No te compares con otros:**
- Cada quien va a su ritmo
- Lo importante es terminar
- Mejor lento y entendiendo que rápido copiando

**¡Tú puedes! 💪**

Sergio, en 2 semanas tendrás:
- ✅ Proyecto real en portfolio
- ✅ Conocimiento sólido de React
- ✅ Confianza para entrevistas
- ✅ Herramienta para escapar de NTT Data

**¡A por todas! 🚀**
