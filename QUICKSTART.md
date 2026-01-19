# 🚀 Szybki start - Helpdesk IT

## Pierwsze uruchomienie projektu

### 1. Uruchom backend

```bash
cd backend
mvn spring-boot:run
```

Backend będzie dostępny pod: `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### 2. Zainstaluj zależności frontendu

```bash
cd frontend
npm install
```

### 3. Uruchom frontend

```bash
npm run dev
```

Frontend będzie dostępny pod: `http://localhost:5173`

### 4. Przetestuj aplikację

1. **Otwórz przeglądarkę**: `http://localhost:5173`
2. **Zarejestruj się**: Kliknij "Zarejestruj się" i utwórz konto
3. **Zaloguj się**: Użyj utworzonego emaila i hasła
4. **Utwórz zgłoszenie**: Kliknij "+ Nowe zgłoszenie"
5. **Sprawdź dashboard**: Zobacz statystyki i ostatnie zgłoszenia

## Testowanie funkcji administratora

Aby uzyskać dostęp do panelu admina, musisz utworzyć konto admina. Backend automatycznie tworzy konto admina jeśli ustawisz zmienne środowiskowe:

```bash
# W terminalu przed uruchomieniem backendu:
export ADMIN_EMAIL=admin@example.com
export ADMIN_PASSWORD=admin123

# Lub w Windows:
set ADMIN_EMAIL=admin@example.com
set ADMIN_PASSWORD=admin123
```

Następnie zaloguj się jako admin i będziesz miał dostęp do:
- Dashboard ze wszystkimi zgłoszeniami
- Możliwość zmiany statusu zgłoszeń
- Dodawanie komentarzy do zgłoszeń

## Typowe problemy

### Problem: Backend nie odpowiada
**Rozwiązanie**: Sprawdź czy backend działa na porcie 8080:
```bash
curl http://localhost:8080/swagger-ui/index.html
```

### Problem: CORS errors w konsoli przeglądarki
**Rozwiązanie**: Upewnij się że w backendzie jest ustawiona zmienna:
```bash
export CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Problem: "Cannot GET /" przy odświeżeniu strony
**Rozwiązanie**: To normalne w trybie deweloperskim. Vite obsługuje routing automatycznie. W produkcji używamy `staticwebapp.config.json`.

### Problem: 401 Unauthorized
**Rozwiązanie**: Token wygasł. Wyloguj się i zaloguj ponownie.

## Użyteczne komendy

```bash
# Frontend
npm run dev          # Uruchom w trybie deweloperskim
npm run build        # Zbuduj dla produkcji
npm run preview      # Podgląd buildu produkcyjnego
npm run lint         # Sprawdź błędy TypeScript/ESLint

# Backend
mvn spring-boot:run  # Uruchom backend
mvn clean install    # Zbuduj projekt
mvn test             # Uruchom testy
```

## Następne kroki

1. Przeczytaj [DEPLOYMENT.md](DEPLOYMENT.md) - instrukcje wdrożenia na Azure
2. Przeczytaj [CHANGES.md](CHANGES.md) - szczegółowa lista zmian
3. Zapoznaj się z [README.md](README.md) - pełna dokumentacja projektu

## 🎉 Gotowe!

Aplikacja jest w pełni funkcjonalna i gotowa do użycia!
