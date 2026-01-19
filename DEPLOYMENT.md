# Instrukcja wdrożenia aplikacji na Azure

## Frontend - Azure Static Web Apps

### Krok 1: Przygotowanie
1. Zainstaluj zależności:
   ```bash
   cd frontend
   npm install
   ```

2. Zbuduj aplikację:
   ```bash
   npm run build
   ```

### Krok 2: Wdrożenie na Azure Static Web Apps

#### Opcja A: Przez Azure Portal (ręcznie)
1. Zaloguj się do [Azure Portal](https://portal.azure.com)
2. Utwórz nowy zasób "Static Web App"
3. Wypełnij formularz:
   - Subscription: Wybierz swoją subskrypcję
   - Resource Group: Utwórz nowy lub wybierz istniejący
   - Name: helpdesk-frontend (lub inna nazwa)
   - Region: West Europe (lub bliżej Ciebie)
   - Deployment source: GitHub (połącz z repozytorium)
4. Skonfiguruj build:
   - App location: `/frontend`
   - Output location: `dist`
5. Kliknij "Review + Create" i "Create"

#### Opcja B: Przez Azure CLI
```bash
# Zaloguj się do Azure
az login

# Utwórz resource group (jeśli nie istnieje)
az group create --name helpdesk-rg --location westeurope

# Utwórz Static Web App
az staticwebapp create \
  --name helpdesk-frontend \
  --resource-group helpdesk-rg \
  --source https://github.com/TWOJE-KONTO/TWOJE-REPO \
  --location westeurope \
  --branch main \
  --app-location "/frontend" \
  --output-location "dist" \
  --login-with-github
```

### Krok 3: Konfiguracja zmiennych środowiskowych

1. W Azure Portal, przejdź do swojej Static Web App
2. W menu po lewej, wybierz "Configuration"
3. Dodaj zmienną środowiskową:
   - Name: `VITE_API_BASE_URL`
   - Value: URL Twojego backendu na Azure (np. `https://twoja-aplikacja.azurewebsites.net`)

### Krok 4: Aktualizacja pliku .env.production

Przed wdrożeniem, zaktualizuj plik `.env.production`:
```bash
VITE_API_BASE_URL=https://twoja-aplikacja.azurewebsites.net
```

## Backend - Już wdrożony

Backend jest już wdrożony na Azure. Upewnij się, że:
1. Backend działa poprawnie pod URL-em z Azure
2. CORS jest skonfigurowany poprawnie w `application-azure.yaml`:
   ```yaml
   helpdesk:
     cors:
       allowed-origins: https://twoja-static-web-app.azurestaticapps.net
   ```

## Testowanie

Po wdrożeniu:
1. Otwórz URL swojej Static Web App (np. `https://helpdesk-frontend.azurestaticapps.net`)
2. Zarejestruj nowe konto
3. Zaloguj się
4. Utwórz testowe zgłoszenie
5. Sprawdź czy załączniki działają
6. Przetestuj wszystkie funkcje

## Rozwiązywanie problemów

### Problem: Backend nie odpowiada
- Sprawdź czy URL backendu w `.env.production` jest poprawny
- Sprawdź logi backendu w Azure Portal

### Problem: CORS errors
- Upewnij się że URL frontendu jest dodany do `allowed-origins` w konfiguracji backendu
- Zrestartuj backend po zmianie konfiguracji

### Problem: 404 przy odświeżeniu strony
- Sprawdź czy plik `staticwebapp.config.json` został poprawnie wdrożony
- Upewnij się że routing fallback jest skonfigurowany

## Continuous Deployment

Po skonfigurowaniu GitHub Actions (plik `.github/workflows/azure-static-web-apps.yml`):
1. Każdy push do brancha `main` automatycznie wdroży nową wersję
2. Pull requesty utworzą preview environments
3. Możesz monitorować wdrożenia w zakładce "Actions" w GitHub

## Użyteczne komendy

```bash
# Uruchom lokalnie z produkcyjnym buildem
npm run build
npm run preview

# Sprawdź błędy TypeScript
npm run lint

# Zbuduj dla produkcji
npm run build
```

## Dodatkowo

- Azure Static Web Apps oferuje darmowy tier (100 GB bandwidth/miesiąc)
- SSL/HTTPS jest automatycznie skonfigurowane
- CDN jest wbudowany
- Możesz dodać custom domain w ustawieniach Static Web App
