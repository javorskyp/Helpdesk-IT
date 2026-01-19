# Helpdesk IT - System Zgłoszeń IT

System do zarządzania zgłoszeniami IT z podziałem na backend (Spring Boot) i frontend (React + TypeScript).

## 🚀 Uruchomienie projektu

### Backend

Swagger UI: http://localhost:8080/swagger-ui/index.html

#### Zmienne środowiskowe

Wymagane dla każdego profilu:

- `JWT_SECRET` - sekret do podpisywania tokenów JWT
- `PEPPER` - dodatkowa wartość do haszowania haseł
- `CORS_ALLOWED_ORIGINS` - lista dozwolonych origins (rozdzielona przecinkami)
  np. `http://localhost:5173,https://localhost:5173`

Wymagane przy profilu `azure` (integracja z Azure Blob Storage i Azure Communication Email):

- `BLOB_STORAGE_CONNECTION_STRING` - connection string do kontenera Blob Storage
- `MAIL_ENDPOINT` - endpoint usługi Azure Communication Email
- `MAIL_ACCESS_KEY` - klucz dostępu do Azure Communication Email
- `DB_USERNAME` - nazwa użytkownika bazy danych Azure SQL
- `DB_PASSWORD` - hasło do bazy danych Azure SQL

#### Uruchomienie backendu

Lokalnie (domyślny profil, pliki na dysku `${user.home}/helpdesk-storage`):

```bash
cd backend
mvn spring-boot:run
```

Integracja z Azure (profil `azure`):

```bash
cd backend
mvn -Dspring-boot.run.profiles=azure spring-boot:run
```

### Frontend

#### Instalacja zależności

```bash
cd frontend
npm install
```

#### Konfiguracja

Skopiuj plik `.env.example` do `.env` i ustaw URL backendu:

```bash
cp .env.example .env
```

W pliku `.env`:
```
VITE_API_BASE_URL=http://localhost:8080
```

#### Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:5173

#### Build produkcyjny

```bash
npm run build
```

Zbudowane pliki znajdą się w katalogu `dist/`.

## 🌐 Wdrożenie na Azure

Szczegółowe instrukcje wdrożenia znajdują się w pliku [DEPLOYMENT.md](DEPLOYMENT.md).

### Krótko:

1. **Backend** - już wdrożony na Azure App Service
2. **Frontend** - wdrożenie na Azure Static Web Apps:
   - Ustaw zmienną środowiskową `VITE_API_BASE_URL` na URL backendu
   - Skonfiguruj CORS w backendzie aby akceptował requesty z frontendu
   - Wdróż przez Azure Portal lub GitHub Actions

## 📁 Struktura projektu

```
helpdesk-it/
├── backend/              # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/    # Kod źródłowy Java
│   │       └── resources/
│   │           ├── application.yaml
│   │           └── application-azure.yaml
│   └── pom.xml
│
├── frontend/            # React + TypeScript frontend
│   ├── src/
│   │   ├── components/  # Komponenty React
│   │   ├── pages/       # Strony aplikacji
│   │   ├── services/    # Serwisy API
│   │   ├── types/       # Typy TypeScript
│   │   ├── utils/       # Funkcje pomocnicze
│   │   └── styles/      # Style CSS
│   ├── .env.example
│   └── package.json
│
├── DEPLOYMENT.md        # Instrukcje wdrożenia
└── README.md
```

## 🔑 Funkcjonalności

### Dla użytkowników:
- ✅ Rejestracja i logowanie
- ✅ Tworzenie zgłoszeń IT
- ✅ Dodawanie załączników do zgłoszeń
- ✅ Przeglądanie własnych zgłoszeń
- ✅ Śledzenie statusu zgłoszeń
- ✅ Ocena rozwiązanych zgłoszeń

### Dla administratorów:
- ✅ Dashboard ze statystykami
- ✅ Przeglądanie wszystkich zgłoszeń
- ✅ Zmiana statusu zgłoszeń
- ✅ Dodawanie komentarzy do zgłoszeń
- ✅ Zarządzanie zgłoszeniami

## 🛠️ Technologie

### Backend:
- Java 17
- Spring Boot 3.x
- Spring Security (JWT)
- Spring Data JPA
- H2 Database (dev) / Azure SQL (prod)
- Azure Blob Storage (prod)
- Azure Communication Services (email)

### Frontend:
- React 19
- TypeScript
- Vite
- React Router
- Fetch API

## 📝 API Endpoints

### Użytkownicy
- `POST /users/register` - Rejestracja
- `POST /users/login` - Logowanie
- `POST /users/token/refreshToken` - Odświeżenie tokenu
- `POST /users/token/logout` - Wylogowanie
- `GET /users/current` - Dane zalogowanego użytkownika

### Zgłoszenia
- `POST /tickets` - Nowe zgłoszenie
- `GET /tickets` - Lista wszystkich zgłoszeń (admin)
- `GET /tickets/current` - Zgłoszenia zalogowanego użytkownika
- `GET /tickets/{id}` - Szczegóły zgłoszenia
- `PUT /tickets/{id}/status` - Zmiana statusu
- `POST /tickets/{id}/comments` - Dodaj komentarz
- `POST /tickets/{id}/rating` - Oceń zgłoszenie

### Pliki
- `POST /files` - Upload pliku
- `GET /files/{id}` - Pobierz plik

## 🔒 Bezpieczeństwo

- Hasła hashowane z użyciem BCrypt + pepper
- JWT tokeny z refresh tokenem w HttpOnly cookie
- CORS skonfigurowany dla określonych origins
- Walidacja danych wejściowych
- Autoryzacja na poziomie endpointów

## 📄 Licencja

Projekt edukacyjny - Politechnika Warszawska
