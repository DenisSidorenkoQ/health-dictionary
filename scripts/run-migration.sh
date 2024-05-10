docker run --rm `
  -v "D:/rep/electronic-journal/db:/flyway/sql" `
  --network "electronic-journal_default" `
  flyway/flyway `
  -url=jdbc:postgresql://electronic-journal:5432/postgres `
  -user=postgres `
  -password=postgres `
  migrate
