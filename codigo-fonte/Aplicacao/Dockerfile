# Etapa 1: Usando a imagem base do .NET 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Etapa 2: Usando uma imagem do SDK para compilar a aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["codigo-fonte/Aplicacao/Aplicacao.csproj", "./"]
RUN dotnet restore "Aplicacao.csproj"
COPY . . 
WORKDIR "/src/."
RUN dotnet build "Aplicacao.csproj" -c Release -o /app/build

# Etapa 3: Publicando a aplicação
FROM build AS publish
RUN dotnet publish "Aplicacao.csproj" -c Release -o /app/publish

# Etapa 4: Criando a imagem final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish . 
ENTRYPOINT ["dotnet", "Aplicacao.dll"]
