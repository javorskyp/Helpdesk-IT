# Helpdesk IT Backend

## Zmienne srodowiskowe

Wymagane przy profilu `azure` (integracja z Azure Blob Storage i Azure Communication Email):

- `BLOB_STORAGE_CONNECTION_STRING` - connection string do kontenera Blob Storage.
- `MAIL_ENDPOINT` - endpoint uslugi Azure Communication Email.
- `MAIL_ACCESS_KEY` - klucz dostepu do Azure Communication Email.

## Uruchomienie

Lokalnie (domyslny profil, pliki na dysku ${user.home}/helpdesk-storage):

```bash
mvn spring-boot:run
```

Integracja z Azure (profil `azure`):

Przyklad (jedna linia) z przekazaniem wartosci jako argumenty Spring Boot:

```bash
mvn -Dspring-boot.run.profiles=azure -Dspring-boot.run.arguments="--helpdesk.storage.azure.connection-string=DefaultEndpointsProtocol=... --helpdesk.mail.azure.endpoint=https://... --helpdesk.mail.azure.access-key=..." spring-boot:run
```
